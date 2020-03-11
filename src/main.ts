import * as core from '@actions/core'
import * as github from '@actions/github'
import SendSlack from './slack'

async function run (): Promise < void > {
  try {
    let {
      SLACK_BOT_TOKEN
    } = process.env

    if (!SLACK_BOT_TOKEN) {
      SLACK_BOT_TOKEN = core.getInput('token', { required: true })
    }

    if (!SLACK_BOT_TOKEN) {
      throw new Error('Missing SLACK_BOT_TOKEN')
    }

    core.setSecret(SLACK_BOT_TOKEN)

    const success = core.getInput('status') === 'Success'
    const channel = core.getInput('channel')
    const name = core.getInput('name') || github.context.payload.repository?.full_name || ''
    const url = core.getInput('url') || github.context.payload.repository?.html_url || ''
    const action = core.getInput('action')
    const version = core.getInput('version')
    const platform = core.getInput('platform')

    const result = await SendSlack(SLACK_BOT_TOKEN, {
      success,
      channel,
      name,
      url,
      action,
      version,
      platform
    })

    core.debug(result)
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
    process.exit(1)
  }
}

void run()
