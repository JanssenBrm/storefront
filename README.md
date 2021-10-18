# APISuite Marketplace Storefront

This is APISuite's Storefront repository.

## Set up

### Requirements

* Node.js >=v14

### Install dependencies

```bash
npm i
```

### Configuring your local environment

1. Copy the `.env.sample` file to `.env` and adapt it to your setup

## Run

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
