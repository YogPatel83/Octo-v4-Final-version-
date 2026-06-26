module.exports = {
  apps: [
    {
      name: "octo-worker",
      script: "/opt/octo/workers/production/octo-worker.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "8080",
        OCTO_WORKER_INTERVAL_MS: "15000"
      }
    }
  ]
};
