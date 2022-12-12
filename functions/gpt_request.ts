import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { OpenAI } from "https://deno.land/x/openai_mini@0.2.0/mod.ts";

export const GPTRequestFunctionDefinition = DefineFunction({
  callback_id: "gpt_function",
  title: "Generate an OpenAI Completion",
  description: "Generate an OpenAI Completion",
  source_file: "functions/gpt_request.ts",
  input_parameters: {
    properties: {
      query: {
        type: Schema.types.string,
        description: "Query to OpenAI Completion API",
      },
    },
    required: ["query"],
  },
  output_parameters: {
    properties: {
      completion: {
        type: Schema.types.string,
        description: "Response from OpenAI Completion API",
      },
      query: {
        type: Schema.types.string,
        description: "Sanitized query",
      },
    },
    required: ["completion"],
  },
});

export default SlackFunction(
  GPTRequestFunctionDefinition,
  async ({ inputs, env }) => {
    const { query } = inputs;
    const instance = new OpenAI(
      env["openai_token"],
    );

    // Remove Slack bot tags and other tags too (obviously not ideal)
    const parsed_query = query.replace(/<[^>]*>/g, "");

    // API reference https://beta.openai.com/docs/api-reference/completions
    const response = await instance.createCompletion({
      prompt: parsed_query,
      model: "text-davinci-003", // ← Change this for other models
      max_tokens: 1000, // ← Change this for token usage. Maximum token allowance ~ 4096 for davinci-003. Response time is longer for larger token allowances
      temperature: 0, // "Creativity" as a knob between 0 (minimum) and 1 (maximum)
      logprobs: null,
      stream: false,
      stop: "",
      top_p: 1,
      n: 1,
    });

    const completion = response.choices[0].text;
    return { outputs: { completion, parsed_query } };
  },
);
