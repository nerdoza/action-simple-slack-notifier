# GitHub Action Simple Slack Notifier

This action sends a very compact message to a designated Slack channel. Ideal for channels that are just looking for red/green deployment flags.

## Usage
```yml
- name: Send Notification
  uses: nerdoza/action-simple-slack-notifier@v1
  if: always()
  with:
    token: ${{ secrets.SLACK_BOT_TOKEN }}
    status: ${{ job.status }}
    version: ${{ steps.check.outputs.version }}
    platform: Windows
```

*Output:*

![Full Example Image](.github/img/full.png)

## Setting Up Slack App Bot

This GitHub Action requires the use of the Slack App API.

1. **Create a Slack App**. Go to [Slack Apps API](https://api.slack.com/apps), then click **Create New App**. Give the app an appropriate name (ex: _GitHub Notifier_) and ensure that your **Development Slack Workspace** is selected.
2. **Add a Bot**. Navigate to the **OAuth & Permissions** page under **Features** sidebar. Use the **Add an OAuth Scope** button and add the `chat:write` scope. Then click the **Install App to Workspace** button on the top of the page.
3. **Add token to secrets**. Copy the **Bot User OAuth Access Token** created after installing the app and set it as a secure token inside your GitHub repository (ex: *SLACK_BOT_TOKEN*).
4. **Invite your bot**. Go to the target channel for your notification and invite your bot by referencing the bot (ex: `@github_notifier`).

## Inputs

### `token`

**Required** The Slack Bot Token

###  `status`

**Optional** A string value indicating if the build process has succeeded. (Default: `success`)

### `channel`

**Optional** The target channel for notification. (Default: `#general`)

### `name`

**Optional** The project name for notification. (Default: Full Repo Name)

### `action`

**Optional** The process name for notification. (Default: `Build`)

### `url`

**Optional** The url link applied to the process notification. Available options are `action`, `repo`, or a static url string. (Default: `action`)

### `version`

**Optional** The version number for notification.

### `platform`

**Optional** The platform identifier for notification.

## Simple Usage Example
```yml
- name: Send Notification
  uses: nerdoza/action-simple-slack-notifier@v1
  if: always()
  with:
    token: ${{ secrets.SLACK_BOT_TOKEN }}
    status: ${{ job.status }}
```

![Simple Example Image](.github/img/simple.png)

## Advanced Usage Example
```yml
- name: Send Notification
  uses: nerdoza/action-simple-slack-notifier@v1
  if: always()
  with:
    token: ${{ secrets.SLACK_BOT_TOKEN }}
    status: ${{ job.status }}
    channel: '#deployment'
    name: SuperImportantClientProject
    url: ${{ steps.monitor.monitor_url }}
    action: Deployment
    version: ${{ steps.check.outputs.version }}
    platform: Windows x86
```

![Advanced Example Image](.github/img/advanced.png)

---

## Copyright and License
© 2024 Zachary Cardoza under the [MIT license](LICENSE.md).
