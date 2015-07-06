import {I18N} from 'aurelia-i18next';

export function configure(aurelia) {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .history()
    .router()
    .eventAggregator()
    .developmentLogging()
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
}
