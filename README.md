# GitHub Action Simple Slack Notifier

This action sends a very compact message to a designated Slack channel. Ideal for channels that are just looking for red/green deployment flags.

## Usage
```yml
- name: Send Notification
  uses: bayssmekanique/action-simple-slack-notifier@v1
  if: always()
  with:
    token: ${{ secrets.SLACK_BOT_TOKEN }}
    version: ${{ steps.check.outputs.version }}
    platform: Windows
```

*Output:*

![Full Example Image](img/full.png)

## Setting Up Slack App Bot

This GitHub Action requires the use of the Slack App API.

1. **Create a Slack App**. Go to [Slack Apps API](https://api.slack.com/apps), then click "Create New App". Give the app an appropriate name (ex: _GitHub Notifier_) and ensure that your *Development Slack Workspace* is selected.
2. **Add a Bot**. Navigate to the **OAuth & Permissions** page under **Features** sidebar. Use the **Add an OAuth Scope** button and add the `chat:write` scope.  Then click the **Install App to Workspace** button on the top of the page.
3. **Add token to secrets**. Copy the **Bot User OAuth Access Token** created after installing the app and set it as a secure token inside your GitHub repository.
4. **Invite your bot**. Go to the target channel for your notification and invite your bot by referencing the bot (ex: `@github_notifier`).

## Inputs

### `token`

**Required** The Slack Bot Token

###  `success`

**Optional** A boolean value indicating if the build process has succeeded. (Default: Job Status)

### `channel`

**Optional** The target channel for notification. (Default: `general`)

### `name`

**Optional** The project name for notification. (Default: Full Repo Name)

### `action`

**Optional** The process name for notification. (Default: `Build`)

### `version`

**Optional** The version number for notification.

### `platform`

**Optional** The platform identifier for notification.

## Simple Usage Example
```yml
- name: Send Notification
  uses: bayssmekanique/action-simple-slack-notifier@v1
  if: always()
  with:
    token: ${{ secrets.SLACK_BOT_TOKEN }}
```

![Simple Example Image](img/simple.png)

## Advanced Usage Example
```yml
- name: Send Notification
  uses: bayssmekanique/action-simple-slack-notifier@v1
  if: always()
  with:
    token: ${{ secrets.SLACK_BOT_TOKEN }}
    success: ${{ steps.build.outputs.valid }}
    channel: '#deployment'
    name: SuperImportantClientProject
    action: Deployment
    version: ${{ steps.check.outputs.version }}
    platform: Windows x86
```

![Advanced Example Image](img/advanced.png)

---

## Copyright and License
© 2020 Zachary Cardoza under the [MIT license](LICENSE.md).