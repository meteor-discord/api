import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { autoload } from "elysia-autoload";
import { join } from "path";
import packageJson from "../package.json";

export const app = new Elysia().use(
  await autoload({
    dir: join(__dirname, "routes"),
  }),
).use(cors()).use(swagger({
  documentation: {
    info: {
      title: "Meteor API",
      version: packageJson.version,
      description: "Meteor API is an open-source REST API that powers the Meteor Discord application.",
      license: {
        name: "MIT",
        url: "https://github.com/meteor-discord/api/blob/main/LICENSE",
      },
      termsOfService: "https://meteors.cc/terms",
    },
    tags: [
      {
        name: "Image Generation",
        description: "Image generation endpoints.",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
})).listen(3000);

export type ElysiaApp = typeof app;
