[![Core integration][core-shield]](https://kontent.ai/integrations/semrush)

![Last modified][last-commit]
[![Issues][issues-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![MIT License][license-shield]][license-url]

[![Stack Overflow][stack-shield]](https://stackoverflow.com/tags/kontent-ai)
[![Discord][discord-shield]](https://discord.gg/SKCxwPtevJ)

<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/kai-logo-hor-neg-rgb.svg">
  <img alt="Kontent.ai logo for dark/light scheme." src="docs/kai-logo-hor-pos-rgb.svg" width="300">
</picture>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/semrush-logo-dark.svg">
  <img alt="Kontent.ai logo for dark/light scheme." src="docs/semrush-logo-light.svg" width="300">
</picture>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#getting-started">Getting started</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#additional-resources">Resources</a>
</p>

This [custom element](https://kontent.ai/learn/tutorials/develop-apps/integrate/content-editing-extensions/) extension for [Kontent.ai](https://kontent.ai) allows users to analyze keywords through [Semrush](https://www.semrush.com).

## Features
Editors can analyze lists of keywords across different regions. The editor needs to have working Semrush account in order to log into the application.

## Demo

![Demo Animation](docs/demo.gif)

## Getting started

### Quick Deploy

Netlify has made this easy. If you click the deploy button below, it will guide you through the process of deploying it to Netlify and leave you with a copy of the repository in your account as well.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kentico/kontent-integration-semrush)

### Running manually

You will need to [deploy](https://docs.netlify.com/functions/deploy/?fn-language=ts) the [Netlify function](https://docs.netlify.com/functions/overview/) in the `api` directory.
Or [run it locally](https://docs.netlify.com/functions/build/#test-locally).

The integration's custom element is created with [Create React App](https://create-react-app.dev/). First you will need to install npm dependencies with `npm install`. Then use `npm run build` to build the integration or `npm run start` to start a local development server. See https://create-react-app.dev/docs/available-scripts for more scripts.

You can also run the whole environment (custom element and Netlify functions) with `npm run netlify` or [`netlify dev`](https://cli.netlify.com/netlify-dev/). You can provide the `SEMRUSH_API_KEY` environment variable with `.env.local` file.

## Configuration

### Configuring the Netlify functions

Since you don't want to store the API key inside the custom element config, we are using Netlify functions to act as a proxy between your custom element and the Semrush API.
In order to make the functions work, you'll need to provide them with the key. You can get the key following [this tutorial](https://www.semrush.com/kb/92-api-key).
We'll use Netlify's Build environment variable. The only issue with these variables is that they are being loaded on build, so whenever you change the variables, you'll need to manually trigger a rebuild.

The expected variable name for the functions is SEMRUSH_API_KEY.

How this all can be done is described in our [Kontent.ai-Netlify example repository](https://github.com/kontent-ai/integration-example-netlify).

### Configuring the Custom Element

To install and configure your extensions, simply create a custom element in your desired content model and fill out the following values:

![configuration](docs/configuration.png)

The `keywordsElementCodename` has to contain a codename of a text element/custom element that contains your keywords. There has to be a **semicolon** between the different values.

Please, keep in mind, that you have to pick the same keyword element from the dropdown under the hosted code URL so the application can access the element and read from it.

## What is Saved
This custom element doesn't save any value.

## Contributors
We have collected notes on how to contribute to this project in [CONTRIBUTING.md](CONTRIBUTING.md).

<a href="https://github.com/Kentico/kontent-integration-semrush/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kentico/kontent-integration-semrush" />
</a>

## Additional Resources

- [Kontent's Integration documentation](https://kontent.ai/learn/tutorials/develop-apps/integrate/integrations-overview/)
- [Custom Element documentation](https://kontent.ai/learn/tutorials/develop-apps/integrate/content-editing-extensions/)
- [Custom Element API reference](https://kontent.ai/learn/reference/custom-elements-js-api/)



[last-commit]: https://img.shields.io/github/last-commit/Kentico/kontent-integration-semrush?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/Kentico/kontent-integration-semrush.svg?style=for-the-badge
[contributors-url]: https://github.com/Kentico/kontent-integration-semrush/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Kentico/kontent-integration-semrush.svg?style=for-the-badge
[forks-url]: https://github.com/Kentico/kontent-integration-semrush/network/members
[issues-shield]: https://img.shields.io/github/issues/Kentico/kontent-integration-semrush.svg?style=for-the-badge
[issues-url]: https://github.com/Kentico/kontent-integration-semrush/issues
[license-shield]: https://img.shields.io/github/license/Kentico/kontent-integration-semrush.svg?style=for-the-badge
[license-url]: https://github.com/Kentico/kontent-integration-semrush/blob/master/LICENSE
[core-shield]: https://img.shields.io/static/v1?label=&message=core%20integration&style=for-the-badge&color=FF5733
[stack-shield]: https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white&style=for-the-badge
[discord-shield]: https://img.shields.io/discord/821885171984891914?label=Discord&logo=Discord&logoColor=white&style=for-the-badge
