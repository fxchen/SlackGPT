import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { OpenAI } from "https://deno.land/x/openai@1.2.1/mod.ts";

export const ChatGPTRequestFunctionDefinition = DefineFunction({
  callback_id: "gpt_function",
  title: "Generate an OpenAI Chat Completion",
  description: "Generate an OpenAI Chat Completion",
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
  ChatGPTRequestFunctionDefinition,
  async ({ inputs, env }) => {
    const { query } = inputs;
    const openAI = new OpenAI(env["openai_token"]);

    // Remove Slack bot tags and other tags too (obviously not ideal)
    const parsed_query = query.replace(/<[^>]*>/g, "");

    // API reference https://platform.openai.com/docs/guides/chat
    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "user", "content": parsed_query },
      ],
    });

    const completion = response.choices[0].message["content"];
    return { outputs: { completion, parsed_query } };
  },
);
