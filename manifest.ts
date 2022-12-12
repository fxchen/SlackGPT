import { Manifest } from "deno-slack-sdk/mod.ts";
import GPTWorkflow from "./workflows/gpt_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "SlackGPT",
  description: "SlackGPT - interact with ChatGPT with app mentions",
  icon: "assets/app_icon_midjourney_optimized.png",
  workflows: [GPTWorkflow],
  outgoingDomains: ["api.openai.com"],
  botScopes: [
    "app_mentions:read",
    "channels:join",
    "commands",
    "chat:write",
    "chat:write.public",
    "im:read",
  ],
});
