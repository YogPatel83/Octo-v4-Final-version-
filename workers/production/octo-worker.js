const http = require("http");

const PORT = Number(process.env.PORT || process.env.OCTO_WORKER_PORT || 8080);
const WEB_URL = process.env.NEXT_PUBLIC_APP_URL;
const WORKER_SECRET = process.env.OCTO_WORKER_SECRET;

async function callOcto(path, body = {}) {
  if (!WEB_URL) throw new Error("NEXT_PUBLIC_APP_URL is missing.");
  if (!WORKER_SECRET) throw new Error("OCTO_WORKER_SECRET is missing.");

  const res = await fetch(`${WEB_URL}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-octo-worker-secret": WORKER_SECRET,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  try {
    return { ok: res.ok, status: res.status, data: JSON.parse(text) };
  } catch {
    return { ok: res.ok, status: res.status, data: text };
  }
}

async function workerLoop() {
  try {
    await callOcto("/api/worker/ping", {
      worker: "digitalocean-production-worker",
      time: new Date().toISOString(),
    });

    const pulled = await callOcto("/api/worker/pull", {
      worker: "digitalocean-production-worker",
      limit: 5,
    });

    console.log("[worker] pulled", JSON.stringify(pulled));

    if (pulled?.data?.tasks && Array.isArray(pulled.data.tasks)) {
      for (const task of pulled.data.tasks) {
        const result = await callOcto("/api/runtime/process", {
          task_id: task.id,
          worker: "digitalocean-production-worker",
        });

        console.log("[worker] processed", task.id, JSON.stringify(result));

        await callOcto("/api/worker/complete", {
          task_id: task.id,
          result,
          worker: "digitalocean-production-worker",
        });
      }
    }
  } catch (error) {
    console.error("[worker] loop error", error.message);
  }
}

setInterval(workerLoop, Number(process.env.OCTO_WORKER_INTERVAL_MS || 15000));
workerLoop();

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
      ok: true,
      worker: "digitalocean-production-worker",
      time: new Date().toISOString(),
    }));
    return;
  }

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`[worker] Octo worker running on port ${PORT}`);
});
