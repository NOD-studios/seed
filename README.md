[![NODstrap][logo-image]][repo-url]

[![Join the chat][gitter-image]][gitter-url]
[![GitHub tag][tag-image]][tag-url]
[![Dependency Status][david-image]][david-url]

[NODstrap]([repo-url]) is an opinionated bootstrapper for building web projects
with conventions of [NOD studios](http://nod.st).

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
SYNC=true
SYNC_PORT=22
SYNC_USER='remoteuser'
SYNC_HOST='server.example.com'
SYNC_PATH='~/Projects/NOD-strap'
SYNC_KEY='/Users/remoteuser/.ssh/id_rsa'
```

###Requirements
- Git
- npm
- Node.js
- Composer
- PHP
- Apache Server

###TODO
- Make PHP and Apache even more optional
- Integration with web components standarts
- Integration with ES6/ES7 documentation generation

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
