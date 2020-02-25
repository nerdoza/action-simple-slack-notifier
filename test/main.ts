import { expect } from 'chai'
import SendSlack from '../src/slack'
require('dotenv').config()

// tslint:disable: no-unused-expression

const token = process.env.TESTING_SLACK_BOT_TOKEN
const channel = '#notification-development'
const name = 'GHASimpleSlackNotifier'
const url = 'https://github.com/bayssmekanique/action-simple-slack-notifier'
const action = 'Build'
const version = '1.2.3'
const platform = 'Windows'

describe('Slack', () => {

  it('can send full success message', async () => {
    let result = await SendSlack(token, {
      success: true,
      channel,
      name,
      url,
      action,
      version,
      platform
    })
    expect(result).to.exist
  })

  it('can send full failure message', async () => {
    let result = await SendSlack(token, {
      success: false,
      channel,
      name,
      url,
      action,
      version,
      platform
    })
    expect(result).to.exist
  })

  it('can send success message without platform', async () => {
    let result = await SendSlack(token, {
      success: true,
      channel,
      name,
      url,
      action,
      version,
      platform: undefined
    })
    expect(result).to.exist
  })

  it('can send failure message without platform', async () => {
    let result = await SendSlack(token, {
      success: false,
      channel,
      name,
      url,
      action,
      version,
      platform: undefined
    })
    expect(result).to.exist
  })

  it('can send success message without version', async () => {
    let result = await SendSlack(token, {
      success: true,
      channel,
      name,
      url,
      action,
      version: undefined,
      platform
    })
    expect(result).to.exist
  })

  it('can send failure message without version', async () => {
    let result = await SendSlack(token, {
      success: false,
      channel,
      name,
      url,
      action,
      version: undefined,
      platform
    })
    expect(result).to.exist
  })

  it('can send success message without any optionals', async () => {
    let result = await SendSlack(token, {
      success: true,
      channel,
      name,
      url,
      action,
      version: undefined,
      platform: undefined
    })
    expect(result).to.exist
  })

  it('can send failure message without any optionals', async () => {
    let result = await SendSlack(token, {
      success: false,
      channel,
      name,
      url,
      action,
      version: undefined,
      platform: undefined
    })
    expect(result).to.exist
  })

})
