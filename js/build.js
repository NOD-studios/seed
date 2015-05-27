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
      include : []
    },
    {
      name    : "main",
      exclude : ['app']
    }
  ],
  paths                   : {
    facebook : "empty:"
  }
})
