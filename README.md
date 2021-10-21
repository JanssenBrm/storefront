# APISuite Marketplace Storefront

[![circleci](https://circleci.com/gh/APISuite/apisuite-be.svg?style=shield)](https://app.circleci.com/pipelines/github/APISuite/apisuite-be)

This is APISuite's Storefront repository.

## Docker

Docker images are available in our [DockerHub](https://hub.docker.com/r/cloudokihub/apisuite-storefront).

Every new image is tagged with:
- latest (dev-latest and stg-latest from develop and staging respectively)
- semantic version from `package.json` (only in production)

Depending on your goals, you could use a fixed version like `1.0.0` or
`latest` to simply get the most recent version every time you pull the image.

## Set up

### Requirements

* Node.js >=v14

### Install dependencies

```bash
npm i
```

### Configuring your local environment

1. Copy the `.env.sample` file to `.env` and adapt it to your setup

### Run

To start a development server that rebuilds the project on every change, run:

```bash
npm run start
```

To create a build:

```bash
npm run build
```

Go to [https://localhost.develop.apisuite.io:9001](https://localhost.develop.apisuite.io:9001)

## Storefront Configuration

The Storefront uses the same type of configuration object as the core but it hads the following properties:

```json
{
  ...
  "storefrontHeaderBackgroundImg": "URL to get the header background image from",
  "storefrontHeaderImg": "URL to get the header main image from",
  "storefrontLogo": "URL to get the Storefront from",
}
```

These settings can be managed via the core API, with the `/settings/storefronts/{name}` endpoints, where `{name}` matches the `REACT_APP_STOREFRONT_NAME` environment variable.