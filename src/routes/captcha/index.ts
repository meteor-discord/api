import type { ElysiaApp } from "~/app";

type CaptchaError = "no_api_key" | "invalid_user_agent" | "internal_error";

export default (app: ElysiaApp) =>
  app.get("/", () => {
    return {
      message: "Hello, world!",
    };
  }, {
    detail: {
      tags: ["Image Generation"],
      description: "Generate a captcha image.",
      security: [
        {
          ApiKeyAuth: [],
        },
      ],
      responses: {
        200: {
          description: "The captcha image was generated successfully.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "number",
                    example: 200,
                    description: "The HTTP status code.",
                  },
                  captcha: {
                    type: "object",
                    properties: {
                      answer: {
                        type: "string",
                      },
                      image: {
                        type: "string",
                        description: "The captcha image in base64 format.",
                        example: "data:image/png;base64...",
                      },
                    },
                  },
                  settings: {
                    type: "object",
                    properties: {
                      width: {
                        type: "number",
                        example: 1280,
                        description: "The width of the captcha image.",
                      },
                      height: {
                        type: "number",
                        example: 720,
                        description: "The height of the captcha image.",
                      },
                      string: {
                        type: "object",
                        properties: {
                          length: {
                            type: "number",
                            example: 6,
                            description: "The length of the captcha answer.",
                          },
                          type: {
                            type: "string",
                            enum: ["numeric", "alphabetic", "alphanumeric"],
                            description: "The type of characters to use in the captcha answer.",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "4xx": {
          description: "The captcha image could not be generated.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "number",
                    example: 401,
                    description: "The HTTP status code.",
                  },
                  error: {
                    type: "string",
                    enum: ["no_api_key", "invalid_user_agent", "internal_error"] satisfies CaptchaError[],
                    description: "The error code.",
                  },
                },
              },
            },
          },
        },
      },
    },
  });
