import type { ElysiaApp } from "~/app";
import packageJson from "../../package.json";

export default (app: ElysiaApp) =>
  app.get("/", () => {
    return {
      startedAt: new Date(Date.now() - process.uptime() * 1000).getTime(),
      version: packageJson.version,
    };
  }, {
    detail: {
      hide: true,
    },
  });
