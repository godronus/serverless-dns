import { spawnSync } from "node:child_process";

const wasmFile = process.argv[2] ?? "./dist/fastedge.wasm";

const envs = {
  CLOUD_PLATFORM: "fastedge",
  CF_DNS_RESOLVER_URL: "https://doh.opendns.com/dns-query",
  DISABLE_BLOCKLISTS: true,
  // PROFILE_DNS_RESOLVES: true,
  // NODE_DOH_ONLY: true,
  // NODE_AVOID_FETCH: false,
  env: "staging",
};

const injectEnvVariables = (envs = {}) => {
  const result = [];
  for (const key in envs) {
    if (envs.hasOwnProperty(key)) {
      result.push("--env", `${key}=${envs[key]}`);
    }
  }
  return result;
};

const cliArgs = [
  "http",
  "-p",
  "3004",
  "-w",
  wasmFile,
  "--wasi-http",
  "true",
  ...injectEnvVariables(envs),
];
// console.log("RUN: cli", cliArgs.join(" "));
spawnSync("fastedge-cli", cliArgs, {
  stdio: "inherit",
  env: {
    ...process.env, // Preserve existing environment variables
    RUST_LOG: "info,http_service=trace",
  },
});
