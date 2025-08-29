# Zed Shipping Calculator

[![CI/CD](https://github.com/engineervix/zed-shipping/actions/workflows/main.yml/badge.svg)](https://github.com/engineervix/zed-shipping/actions/workflows/main.yml)

[![Node v22](https://img.shields.io/badge/Node-v22-teal.svg)](https://nodejs.org/en/blog/release/v22.0.0)
[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Changelog](https://img.shields.io/badge/changelog-conventional-brightgreen.svg)](http://conventional-changelog.github.io)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This is a small tool that provides instant quotes for both domestic deliveries within Zambia and international shipments originating from the UK.

Built with Vue 3 and Vite, UI powered by PrimeVue and Tailwind CSS.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Data Source & Disclaimer](#data-source--disclaimer)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- **Dual Service Modes**: Easily switch between calculating costs for domestic deliveries and international (UK to Zambia) shipments.
- **Volumetric Weight Calculation**: Automatically determines the billable weight by comparing the package's actual weight against its dimensional weight (`L x W x H / 6000`), ensuring accurate pricing.
- **Zone-Based Domestic Pricing**: Implements One World's official pricing structure based on four distinct delivery zones (Lusaka, Line of Rail, Not Line of Rail, and Remote Areas).
- **Detailed Cost Breakdowns**: For heavier packages (over 30kg for domestic, over 10kg for international), the app shows the base rate and additional costs.
- **Dark & Light Mode**: Includes a user-friendly theme toggle that respects system preferences and saves the user's choice.
- **Responsive Interface**: The UI is fully responsive, providing a seamless experience on both desktop and mobile devices.

---

## Tech Stack

- **Framework**: Vue 3 (using Composition API and `<script setup>`)
- **Build Tool**: Vite
- **UI Components**: PrimeVue 4 with the Aura theme
- **Styling**: Tailwind CSS
- **Utilities**: VueUse
- **Code Quality**: ESLint and Prettier

---

## Data Source & Disclaimer

Please note that this is an **unofficial** calculator. The rates and zone data used in this application are based on the official One World Logistics Service Guide, effective **February 2024**.

This tool is intended for estimation and reference purposes only and is not affiliated with, or endorsed by, One World Logistics. For official quotes and services, please contact One World Logistics directly.

---

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

You need to have Node.js installed on your machine. The required version is specified in `package.json`.

- **Node.js**: v20 or v22

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/engineervix/zed-shipping.git
    ```
2.  Navigate into the project directory:
    ```sh
    cd zed-shipping
    ```
3.  Install the required NPM packages:
    ```sh
    npm install
    ```

---

## Available Scripts

This project includes several scripts to help with development and production workflows:

- **`npm run dev`**
  - Starts the Vite development server with Hot-Module Replacement (HMR).

- **`npm run build`**
  - Compiles and minifies the application for production into the `dist` directory.

- **`npm run preview`**
  - Starts a local server to preview the production build from the `dist` directory.

- **`npm run lint`**
  - Lints the project files using ESLint to find and fix problems in your code.

- **`npm run format`**
  - Formats all source files in the `src/` directory using Prettier.
