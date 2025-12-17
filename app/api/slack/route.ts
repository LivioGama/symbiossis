import {SLACK_CHANNEL, SLACK_WEBHOOK_URL} from '@/models/consts'
import {IncomingWebhook} from '@slack/webhook'

export const POST = async (req: Request) => {
  const {message} = await req.json()
  try {
    const blocks: any[] = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `💬 New message on symbiossis`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${message}*`,
        },
      },
    ]
    const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL)
    await webhook.send({
      attachments: [
        {
          blocks,
        },
      ],
      channel: SLACK_CHANNEL,
    })
  } catch (error) {
    console.error(error)
  }
  return new Response()
}

