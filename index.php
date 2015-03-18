<?php
  $loader        = require_once 'vendor/autoload.php';
  $title         = 'NODstrap';
  $description   = 'NOD studios bootstrap';
  $localIpList   = array('127.0.0.1', '::1');
  $url           = League\Url\Url::createFromServer($_SERVER);
  $host          = $url->getHost()->__toString();
  $query         = $url->getQuery()->__toString();
  $scheme        = $url->getScheme()->__toString();
  $baseUrl       = $url->getBaseUrl();
  $isLocal       = in_array($_SERVER['REMOTE_ADDR'], $localIpList);
  $isLocal       = empty($_REQUEST['isLocal']) ?
    $isLocal : intval($_REQUEST['isLocal']);
  $isLocal       = $isLocal ? true : false;
  $basePath      = '.';
  $version       = '2.0.0';
  $mainJs        = 'main.js';
  $webFont       =  array(
    'typekit'  => array('id' => null),
    'monotype' => array('projectId' => '94e6694c-6914-4848-8cb3-6fb03ba10785')
  );
  $gTrackingId   = 'UA-xxxxxxxxx-1';
  $mainJs        = $isLocal ?
    "{$basePath}/js/{$mainJs}" : "{$basePath}/build/{$mainJs}";
  $config        = compact(
    'title', 'description', 'isLocal', 'basePath', 'jsPath', 'version',
    'webFont', 'domain', 'baseUrl', 'relativeUrl', 'scheme', 'host', 'query',
    'isLocalQ'
  );
?><!DOCTYPE html>

<!-- app -->
<!--[if lt IE 7]>      <html class="app loading no-js lt-ie9 lt-ie8 lt-ie7 mti-inactive wf-inactive"> <![endif]-->
<!--[if IE 7]>         <html class="app loading no-js lt-ie9 lt-ie8 mti-inactive wf-inactive"> <![endif]-->
<!--[if IE 8]>         <html class="app loading no-js lt-ie9 mti-inactive wf-inactive"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="app loading no-js mti-inactive wf-inactive"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script type="text/javascript">
    var AppLoad   = AppLoad || new Array(),
        AppConfig = JSON.parse('<?php echo json_encode($config, JSON_FORCE_OBJECT); ?>'),
        require   = {
          urlArgs : '<?php echo "v={$version}"; ?>'
        }, requireScript;
    </script>
    <script data-main="<?php echo $mainJs; ?>"
      src="vendor/requirejs/require.min.js"
      type="text/javascript"></script>
    <script type="text/javascript">
      if (typeof require.config === 'undefined') {
        requireScript = document.createElement('script');
        requireScript.setAttribute('type', 'text/javascript');
        requireScript.setAttribute('data-main', '<?php echo $mainJs; ?>');
        requireScript.setAttribute('src', '//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.15/require.min.js');
        document.head.appendChild(requireScript);
      }
    </script>
    <style>.loading { visibility: hidden; opacity: 0; }</style>
    <link rel="shortcut icon" href="<?php echo $basePath; ?>/favicon.ico">
    <link rel="apple-touch-icon image_src"
      href="<?php echo $basePath; ?>/apple-touch-icon-precomposed.png">

    <!-- social -->
    <meta itemprop="name" content="<?php echo $title; ?>">
    <meta itemprop="description" content="<?php echo $description; ?>">
    <meta itemprop="image" content="https://nod.st/img/logo.social.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo $title; ?>">
    <meta name="twitter:description" content="<?php echo $description; ?>">
    <meta name="twitter:image:src" content="http://nod.st/img/logo.social.png">
    <meta property="og:url" content="http://nod.st" />
    <meta property="og:image" content="http://nod.st/img/logo.social.png" />
    <meta property="og:image:secure_url" content="https://nod.st/img/logo.social.png" />
    <meta property="og:description" content="<?php echo $description; ?>" />
    <meta property="og:site_name" content="<?php echo $title; ?>" />
    <meta property="fb:page_id" content="765094263578370" />
    <meta property="fb:admins" content="1704931877" />

    <!-- device -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  	<meta name="viewport" content="width=device-width" />
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="icon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!-- asset -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
  	<link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  	<link rel="stylesheet" type="text/css" href="//fast.fonts.net/cssapi/49f56a47-2ad2-44f2-a045-2e3b935f2fda.css"/>

    <link rel="author" href="humans.txt" />

    <link rel="apple-touch-icon" sizes="57x57" href="icon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="icon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="icon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="icon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="icon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="icon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="icon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="icon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="icon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="icon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="16x16" href="icon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="icon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="icon/favicon-96x96.png">
    <link rel="manifest" href="icon/manifest.json">
  </head>
  <body>

    <!-- app/header -->
    <header class="header loading">
      <h1 class="logo"><?php echo $title; ?></h1>
    </header>
    <script type="text/javascript">
      AppLoad.push('header');
    </script>
    <!--/ app/header -->

    <!-- app/menu -->
    <section class="menu loading">
      <nav>
        <ul>
        </ul>
      </nav>
    </section>
    <script type="text/javascript">
      AppLoad.push('menu');
    </script>
    <!-- app/menu -->

    <!-- app/banner -->
    <section class="banner loading"></section>
    <script type="text/javascript">
      AppLoad.push('banner');
    </script>
    <!--/ app/banner -->

    <!-- app/content -->
    <section class="content loading"></section>
    <script type="text/javascript">
      AppLoad.push('content');
    </script>
    <!--/ app/content -->

    <!-- app/modal -->
    <div id="modal" class="modal loading">
      <p>&copy; <?php echo $title; ?></p>
    </div>
    <script type="text/javascript">
      AppLoad.push('modal');
    </script>
    <!--/ app/modal -->

    <!-- app/footer -->
    <footer class="footer loading">
      <p>&copy; <?php echo $title; ?></p>
    </footer>
    <script type="text/javascript">
      AppLoad.push('footer');
    </script>
    <!--/ app/footer -->

    <script type="text/javascript">
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-xxxxxxxxx-1', 'auto');
      ga('send', 'pageview');
    </script>
  </body>
</html>
<!-- /app -->
