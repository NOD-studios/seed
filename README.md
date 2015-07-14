[![NODstrap][logo-image]][repo-url]

[![Join the chat][gitter-image]][gitter-url]
[![GitHub tag][tag-image]][tag-url]
[![Dependency Status][david-image]][david-url]

[NODstrap]([repo-url]) is an opinionated seed for building
web projects with the conventions of [NOD studios](http://nod.st).


View [changelog](CHANGELOG.md).

#Installation:
```bash
git clone git@github.com:NOD-studios/NOD-strap.git
cd NOD-strap
npm install && jspm update && gulp watch
```

###Configuration:

Check `.env.nod` for all the configurations.

`.env.development` or `.env.test` or `.env.production` or `.env.local` file:

```INI
PROXY='localhost/Projects/NOD-strap'
DIR_BASE='/Projects/NOD-strap/'
GIT_REMOTE='origin'
GIT_BRANCH='master'
SYNC_PORT=22
SYNC_USER='remote-user'
SYNC_HOST='test.example.com'
SYNC_PATH='~/Projects/NOD-strap'
SYNC_KEY='/Users/username/.ssh/id_rsa'
REMOTE_PORT=22
REMOTE_USER='remote-user'
REMOTE_HOST='production.example.com'
REMOTE_PATH='/var/www/_Sandbox/NOD-strap'
REMOTE_KEY='/Users/username/.ssh/id_rsa'
```

###Requirements
- Git
- npm
- Node.js

###TODO
- Integration with web component standarts
- Integration with ES6/ES7 documentation generation
- Make it isomorphic and add SEO

#Contact:
[![Join the chat][gitter-image]][gitter-url]

[hey@nod.st](mailto:hey@nod.st)

[logo-image]: /image/logo.strap.png?raw=true
[repo-url]: https://github.com/NOD-studios/NOD-strap
[david-url]: https://david-dm.org/NOD-studios/NOD-strap
[david-image]: https://david-dm.org/NOD-studios/NOD-strap.svg
[gitter-image]: https://img.shields.io/badge/GITTER-join%20chat-green.svg
[gitter-url]: http://bit.ly/NOD-chat
[tag-image]: https://img.shields.io/github/tag/NOD-studios/NOD-strap.svg
[tag-url]: https://github.com/NOD-studios/NOD-strap/tags
