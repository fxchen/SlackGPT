import { Trigger } from "deno-slack-api/types.ts";
import GPTWorkflow from "../workflows/gpt_workflow.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const gptMentionedTrigger: Trigger<typeof GPTWorkflow.definition> = {
  type: "event",
  name: "SlackGPT Mentioned Trigger",
  workflow: "#/workflows/gpt_workflow",
  event: {
    event_type: "slack#/events/app_mentioned",
    channel_ids: ["YOUR_CHANNEL_ID_HERE"], // See instructions https://github.com/fxchen/SlackGPT/blob/main/SETUP.md on adding channel ids here
  },
  inputs: {
    query: {
      value: "{{data.text}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default gptMentionedTrigger;
