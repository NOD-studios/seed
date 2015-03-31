({
  baseUrl                 : "../js",
  dir                     : "../build/",
  siteRoot                : '../',
  appdir                  : "../js/app",
  mainConfigFile          : "./main.js",
  optimize                : "uglify2",
  preserveLicenseComments : false,
  generateSourceMaps      : true,
  keepBuildDir            : false,
  findNestedDependencies  : true,
  optimizeCSS             : 'standart',
  separateCSS             : false,
  modules                 : [
    {
      name    : "app",
      include : [
        "app/content",
        "app/header",
        "app/footer",
        "app/banner",
        "app/modal",
        "app/menu",
        "app/form"
      ]
    },
    {
      name    : "main",
      include : ["app"]
    }
  ],
  paths                   : {
    facebook : "empty:"
  }
})
