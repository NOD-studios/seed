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
        "app/header",
        "app/banner",
        "app/content",
        "app/form",
        "app/footer"
      ]
      //exclude : ["main"]
    },
    {
      name    : "main",
      include : ['app']
    }
  ],
  paths                   : {
    facebook       : "empty:",
    jquery         : "empty:"
  }
})
