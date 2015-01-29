<?php $loader = require_once 'vendor/autoload.php'; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js wf-inactive"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>NODstrap</title>
    <meta name="description" content="NODstrap">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="author" href="humans.txt" />

    <?php
    $localIpList = array('127.0.0.1', '::1');
    $mainJs = 'js/main';
    if (!in_array($_SERVER['REMOTE_ADDR'], $localIpList)) {
      $mainJs = 'build/main';
    }
    ?>

    <script data-main="<?php
      echo $mainJs;
    ?>" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.15/require.min.js" type="text/javascript"></script>
    <!--
      <script data-main="js/main" src="bower_components/requirejs/require.js" type="text/javascript"></script>
    -->

    <!--[if lt IE 9]>
      <script src="js/vendor/html5-3.6-respond-1.1.0.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">

      <!-- app/header -->
      <header>
        <h1 class="logo">NODstrap</h1>
      </header>
      <script type="text/javascript">
        require(['app'], function(app) {
          app.load('header');
        });
      </script>
      <!--/ app/header -->

      <!-- app/banner -->
      <section class="banner"></section>
      <script type="text/javascript">
      require(['app'], function(app) {
        app.load('banner');
      });</script>
      <!--/ app/banner -->

      <!-- app/content -->
      <section class="content"></section>
      <script type="text/javascript">
        require(['app'], function(app) {
          app.load('content');
        });
      </script>
      <!--/ app/content -->

    </div> <!-- /container -->

    <footer class="row">
      <p>&copy; NODstrap</p>
    </footer>
    <script type="text/javascript">
      require(['app'], function(app) {
        app.load('footer');
      });
    </script>

    <script type="text/javascript">
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-58942643-1', 'auto');
      ga('send', 'pageview');
    </script>
    <script type="text/javascript">
      require(['app']);
    </script>
  </body>
</html>
