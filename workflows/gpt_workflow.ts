import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { GPTRequestFunctionDefinition } from "../functions/gpt_request.ts";

/**
 * A Workflow is a set of steps that are executed in order.
 * Each step in a Workflow is a function.
 * https://api.slack.com/future/workflows
 */
const GPTWorkflow = DefineWorkflow({
  callback_id: "gpt_workflow",
  title: "GPT query workflow",
  description: "Receive message, pass onto GPTFunction",
  input_parameters: {
    properties: {
      query: {
        type: Schema.types.string,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["query"],
  },
});

// Step 1: Make the query to OpenAI's GPT
const gptFunctionStep = GPTWorkflow.addStep(
  GPTRequestFunctionDefinition,
  {
    query: GPTWorkflow.inputs.query,
  },
);

// Step 2: Send the message to Slack
GPTWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: GPTWorkflow.inputs.channel,
  message: gptFunctionStep.outputs.completion,
});

export default GPTWorkflow;
