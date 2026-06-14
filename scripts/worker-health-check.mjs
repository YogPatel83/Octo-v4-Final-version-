const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const secret = process.env.OCTO_WORKER_SECRET;

if (!appUrl) {
  console.error("Missing NEXT_PUBLIC_APP_URL");
  process.exit(1);
}

if (!secret) {
  console.error("Missing OCTO_WORKER_SECRET");
  process.exit(1);
}

const res = await fetch(`${appUrl}/api/worker/ping`, {
  method: "POST",
  headers: {
    "x-octo-worker-secret": secret,
  },
});

console.log("Worker health:", res.status);
console.log(await res.text());
