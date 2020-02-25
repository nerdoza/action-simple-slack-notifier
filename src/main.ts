import core from '@actions/core'
import github from '@actions/github'
import SendSlack from './slack'

function toBoolean (value: string) {
  return value === 'true' ? true : false
}

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

    const successText = core.getInput('success')
    const channel = core.getInput('channel')
    const name = core.getInput('name') || github.context.payload.repository?.full_name || ''
    const url = github.context.payload.repository?.html_url || ''
    const action = core.getInput('action')
    const version = core.getInput('version')
    const platform = core.getInput('platform')

    const job = JSON.parse(core.getInput('JOB', { required: true }))
    const success = successText ? toBoolean(successText) : job.status

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
    core.setFailed(error.message)
    process.exit(1)
  }
}

void run()
