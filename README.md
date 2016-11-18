# seed

## Under the Hood
- [Create React App](https://github.com/facebookincubator/create-react-app)
  - [webpack](https://webpack.github.io/)
  - [Babel](https://babeljs.io/)
  - [react](https://facebook.github.io/react/)
  - [PostCSS](http://postcss.org/)
  - [Babel Preset React App](https://www.npmjs.com/package/babel-preset-react-app)
- [Babel Preset Stage 0](https://babeljs.io/docs/plugins/preset-stage-0/)
- [Babel Plugin Add Module Exports](https://babeljs.io/docs/plugins/preset-stage-0/)
- [Babel Plugin Transform Decorators Legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)
- [Redux](http://redux.js.org/)
- [Redux DevTools Extension](http://zalmoxisus.github.io/redux-devtools-extension/)
- [reactstrap](https://reactstrap.github.io/)
- [Bootstrap 4](https://v4-alpha.getbootstrap.com/)
- [gulp](http://gulpjs.com/)
- [Travis CI](https://travis-ci.org/)

## Installation

```bash
git clone https://github.com/NOD-studios/seed
cd seed
```

or if you will use it's components

```bash
npm install --save @nod/seed
```

## Commands

- ### start
```bash
npm start
```

- ### build
```bash
npm run build
```
It will create a optimized production ready folder, after that you can start an http server pointing to that folder with something like:

  ```bash
  npm install -g pushstate-server
  pushstate-server build
  ```

- ### test
```bash
npm test
```
