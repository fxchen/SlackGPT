# Set up in Slack

1. Set up your Slack Platform account (full instructions @
   https://api.slack.com/future/quickstart)

- Accept the terms of service:
  https://slack.com/admin/settings#hermes_permissions
- Install the CLI by running on your terminal

```bash
curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash
```

- Authorize your CLI to interact with Slack on your workspace with by running
  this command on your terminal and follow the prompts

```
slack login
```

- Take the last line from your terminal (e.g.
  `/slackauthticket ABC123defABC123defABC123defABC123defXYZ` and paste that in
  your Slack message bar for your workspace)

<img width="600" alt="Pasting in /slackauthticket ABC123defABC123defABC123defABC123defXYZ" src="https://user-images.githubusercontent.com/178719/206928823-f0dee11c-4fc3-481d-923c-384d8fc85f7a.png">

2. Fork the repo

```
git clone git@github.com:fxchen/SlackGPT
```

3. Get an OpenAI API key (https://beta.openai.com/account/api-keys). **Make sure
   to add billing information**.

<img width="600" alt="instructions-open-ai" src="https://user-images.githubusercontent.com/178719/206929198-044141d0-2d85-4010-b437-051ca06db812.png">

You can test your token validity with this command that executes a completion on
"hello world"

```
TOKEN=YOUR_TOKEN_HERE
completion_openai() {curl -X POST https://api.openai.com/v1/completions -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" -d "{  \"model\": \"text-davinci-003\",  \"prompt\": \"$1\",  \"n\": 1}" | tr -d '\n' | jq '.choices[0].text'}
completion_openai "hello world"
```

4. Save this secret. Create a new file in your `SlackGPT` folder called `.env`.
   Replace the string in this env file with your actual OpenAI token. Details:
   https://beta.openai.com/docs/api-reference/introduction

```bash
openai_token = "YOUR_TOKEN_HERE"
```

Alternatively, use this command at the root directory to add this secret at run
time.

```bash
slack env add openai_token "YOUR_TOKEN_HERE"
```

5. Deploy the SlackGPT application

Run the command `slack deploy`

6. Get channel ids for your bot to watch for by clicking the channel name in
   Slack. In this screenshot, I have a channel called `#hello-slackgpt`.
   Details: https://api.slack.com/future/apicalls/third-party

<img width="600" alt="Instructions for grabbing a channel's channel-id" src="https://user-images.githubusercontent.com/178719/206929132-50f3451e-1224-4440-ba42-d106b8871999.png">

7. Set up your bot to watch for mentions!

- Open `triggers/gpt_mentioned_trigger.ts`
- Update `channel_ids` to include channels where you want SlackGPT to respond to
- Run the command below

```bash
slack trigger create --trigger-def "triggers/gpt_mentioned_trigger.ts"
```

8. 🎉 Use ChatGPT through a Slack interface

<img width="600" alt="Saying hello world to @SlackGPT" src="https://user-images.githubusercontent.com/178719/206929669-06895ca1-3ae1-4ca7-81cb-2ce124f476a3.png">
