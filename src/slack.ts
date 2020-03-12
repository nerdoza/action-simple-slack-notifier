import fetch from 'node-fetch'

export interface NotificationOptions {
  success: boolean
  channel: string
  name: string
  url: string
  action: string
  version?: string
  platform?: string
}

export default async function SendSlack (token: string, options: NotificationOptions) {
  let label = `*${options.action} ${options.success ? 'Success' : 'Failed'}:* <${options.url}|${options.name}>`

  if (options.version || options.platform) {
    label += ' [_'
    if (options.version) {
      label += 'v' + options.version
    }
    if (options.platform) {
      if (options.version) {
        label += ' - '
      }
      label += options.platform
    }
    label += '_]'
  }

  const notification = {
    channel: options.channel,
    attachments: [{
      blocks: [
        {
          type: 'section',
          text:
          {
            type: 'mrkdwn',
            text: label
          }
        }
      ],
      color: options.success ? '#008000' : '#FF0000',
      fallback: label,
    }],
  }

  const request = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(notification)
  })

  const requestJson = await request.json()

  if (requestJson.ok) {
    return 'Slack Notification Successful'
  } else {
    throw new Error(`Slack Notification Failed: ${requestJson.error}`)
  }
}
