# zed-shipping

> A shipping cost calculator for (overseas) online purchases destined for Zambia

[![CI/CD](https://github.com/engineervix/zed-shipping/actions/workflows/main.yml/badge.svg)](https://github.com/engineervix/zed-shipping/actions/workflows/main.yml)

[![Node v16](https://img.shields.io/badge/Node-v16-teal.svg)](https://nodejs.org/en/blog/release/v16.0.0)
[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Changelog](https://img.shields.io/badge/changelog-conventional-brightgreen.svg)](http://conventional-changelog.github.io)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Development](#development)
- [Contributing](#contributing)
- [TODO](#todo)
- [Credits](#credits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

This project uses Node [v16](https://nodejs.org/en/blog/release/v16.0.0). I use [volta](https://volta.sh/) to manage node versions. If you have volta installed on your machine, then it'll automatically use the correct Node binary for this project.

- clone / fork the project
- `cd` into the project directory
- install frontend dependencies

  ```bash
  npm install
  ```

- start the dev server, accessible at <http://localhost:1234/>

  ```bash
  npm start
  ```

See other available scripts in `package.json`.

## Contributing

<!-- Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)): -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions, issues and feature requests are most welcome! A good place to start is by helping out with the unchecked items in the [TODO](#todo) section of this README!

Feel free to check the [issues page](https://github.com/engineervix/zed-shipping/issues) and take a look at the [contributing guide](https://github.com/engineervix/zed-shipping/blob/main/CONTRIBUTING.md) before you get started.

In addition, please note the following:

- if you're making JS code contributions, please try and write some tests to accompany your code, and ensure that the tests pass. Also, were necessary, update the docs so that they reflect your changes.
- your commit messages should follow the conventions described [here](https://www.conventionalcommits.org/en/v1.0.0/). Write your commit message in the imperative: "Fix bug" and not "Fixed bug" or "Fixes bug".
  Once you are done, please create a [pull request](https://github.com/engineervix/zed-shipping/pulls).

## TODO

- [x] Write the core JS logic, using [iShop Worldwide](https://www.ishop-worldwide.com/) as shipping provider
- [ ] Define the overall UI
- [ ] Add other shipping providers
  - [ ] [Macspeedys](https://www.macspeedys.com/)
  - [ ] [Icypeed](https://icypeed.com/)
  - [ ] [One World Logistics and Freight Zambia Ltd.](https://oneworld.co.zm/)
  - [ ] [Mercury](https://icypeed.com/)?
  - [ ] etc.
- [ ] Incorporate exchange rates
- [ ] Compare costs between different providers
- [ ] Toggle dark/light mode

## Credits

- Icon: <https://www.pngrepo.com/svg/276616/shipping-port>
