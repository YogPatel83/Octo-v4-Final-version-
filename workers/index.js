const WORKER_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const WORKER_SECRET = process.env.OCTO_WORKER_SECRET;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function post(path) {
  const res = await fetch(`${WORKER_URL}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-octo-worker-secret": WORKER_SECRET || "",
    },
  });

  return res.json();
}

let schedulerCounter = 0;
let monthlyCounter = 0;

async function main() {
  console.log("Octo full worker started.");

  while (true) {
    try {
      const runtime = await post("/api/runtime/process");
      const execution = await post("/api/execution/run");
      const build = await post("/api/build/run-worker");

      console.log("Runtime:", JSON.stringify(runtime));
      console.log("Execution:", JSON.stringify(execution));
      console.log("Build:", JSON.stringify(build));

      schedulerCounter += 1;
      monthlyCounter += 1;

      if (schedulerCounter >= 12) {
        const scheduled = await post("/api/scheduler/run");
        console.log("Scheduler:", JSON.stringify(scheduled));
        schedulerCounter = 0;
      }

      if (monthlyCounter >= 17280) {
        const monthly = await post("/api/credits/reset-monthly");
        console.log("Monthly credit reset:", JSON.stringify(monthly));
        monthlyCounter = 0;
      }

      const didWork =
        runtime.processed_count > 0 ||
        execution.processed === true ||
        build.processed === true;

      await sleep(didWork ? 1000 : 5000);
    } catch (error) {
      console.error("Worker error:", error);
      await sleep(5000);
    }
  }
}

main();
