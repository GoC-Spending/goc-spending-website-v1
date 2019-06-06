# goc-spending-website-v1

This repository powers the <https://goc-spending.github.io/> website.

It's based on Netlify's [Victor Hugo](https://github.com/netlify-templates/victor-hugo) package, a boilerplate for using [Hugo](https://gohugo.io/) as a static site generator and [Webpack](https://webpack.js.org/) as an asset pipeline.

## Usage

### Prerequisites

You need to have the latest/LTS [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) versions installed in order to use Victor Hugo.

Next step, clone this repository and run:

```bash
npm install
```

This will take some time and will install all packages necessary to run Victor Hugo and its tasks.

### Development

While developing your website, use:

```bash
npm start
```

or for developing your website with `hugo server --buildDrafts --buildFuture`, use:

```bash
npm run preview
```

Then visit http://localhost:3000/ _- or a new browser windows popped-up already -_ to preview your new website. Webpack Dev Server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
npm run build
```

To get a preview of posts or articles not yet published, run:

```bash
npm run build:preview
```

See [package.json](package.json#L8) for all tasks.

### Deploying

This version has been customized to deploy to a separate repo, using GitHub Pages.

To deploy an updated version of the website, run:

```bash
npm run deploy
```

## About

This repository is part of a larger collection of tools to analyze and visualize Government of Canada contract spending.

For more information, see the [main goc-spending repository](https://github.com/GoC-Spending/goc-spending).

This is a volunteer project and is not affiliated with the Government of Canada.
