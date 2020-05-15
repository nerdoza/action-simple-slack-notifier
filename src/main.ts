import * as core from '@actions/core'
import * as github from '@actions/github'
import SendSlack from './slack'

async function run (): Promise < void > {
  try {
    let {
      SLACK_BOT_TOKEN,
      GITHUB_REPOSITORY,
      GITHUB_RUN_ID
    } = process.env

    if (!SLACK_BOT_TOKEN) {
      SLACK_BOT_TOKEN = core.getInput('token', { required: true })
    }

    if (!SLACK_BOT_TOKEN) {
      throw new Error('Missing SLACK_BOT_TOKEN')
    }

    core.setSecret(SLACK_BOT_TOKEN)

    const success = core.getInput('status').toLowerCase() === 'success'
    const channel = core.getInput('channel')
    const name = core.getInput('name') || GITHUB_REPOSITORY || ''
    const action = core.getInput('action')
    const version = core.getInput('version')
    const platform = core.getInput('platform')
    let url = core.getInput('url')

    switch (url) {
      case 'action':
        url = `https://github.com/${ GITHUB_REPOSITORY }/actions/runs/${ GITHUB_RUN_ID }`
        break
      case 'repo':
        url = github.context.payload.repository?.html_url || ''
        break
    }

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
