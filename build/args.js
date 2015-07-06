import yargs from 'yargs';
import moment from 'moment';

let argv           = yargs.argv,
    validBumpTypes = "major|minor|patch|prerelease".split("|"),
    bump           = (argv.bump || 'patch').toLowerCase(),
    message        = (argv.message || moment()
      .format('dddd MMMM YYYY, HH:mm:ss'));

if (validBumpTypes.indexOf(bump) === -1) {
  throw new Error(`Unrecognized bump '${bump}'`);
}

export default {
  bump    : bump,
  message : message
};
