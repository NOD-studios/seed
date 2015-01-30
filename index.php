<?php

  $loader      = require_once 'vendor/autoload.php';
  $title       = 'NODstrap';
  $description = '';
  $localIpList = array('127.0.0.1', '::1');
  $isLocal     = in_array($_SERVER['REMOTE_ADDR'], $localIpList);
  $config      = compact('loader', 'title', 'description', 'isLocal');

?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js wf-inactive"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="author" href="humans.txt" />
    <?php $mainJs = $isLocal ? 'js/main' : 'build/main'; ?>
    <script type="text/javascript">
    var AppLoad = new Array();
    if (typeof require === 'undefined') {
      var requireScript = document.createElement('script');
      requireScript.setAttribute('type', 'text/javascript');
      requireScript.setAttribute('data-main', '<?php echo $mainJs; ?>');
      requireScript.setAttribute('src', 'vendor/requirejs/require.min.js');
      document.head.appendChild(requireScript);
    }
    </script>
  </head>
  <body>
    <div class="container">

      <!-- app/header -->
      <header class="header">
        <h1 class="logo"><?php echo $title; ?></h1>
      </header>
      <script type="text/javascript">AppLoad.push('header');</script>
      <!--/ app/header -->

      <!-- app/banner -->
      <section class="banner"></section>
      <script type="text/javascript">AppLoad.push('banner');</script>
      <!--/ app/banner -->

      <!-- app/content -->
      <section class="content"></section>
      <script type="text/javascript">AppLoad.push('content');</script>
      <!--/ app/content -->

    </div> <!-- /container -->

    <footer class="footer">
      <p>&copy; <?php echo $title; ?></p>
    </footer>
    <script type="text/javascript">AppLoad.push('footer');</script>

    <script type="text/javascript">
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-xxxxxxxxx-1', 'auto');
      ga('send', 'pageview');
    </script>
    <script type="text/javascript">

    </script>
  </body>
</html>
