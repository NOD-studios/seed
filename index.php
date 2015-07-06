<?php
// Boot
$loader = require_once 'vendor/autoload.php';


// DI
use Nod\Environment;
use League\Url\Url;
use \Mustache_Engine as View;
use \Mustache_Loader_FilesystemLoader as ViewLoader;

$app              = new SplObjectStorage;
$app->ds          = DIRECTORY_SEPARATOR;
$app->dir         = __DIR__;
$app->environment = new Environment;
$app->url         = Url::createFromServer($_SERVER);
$app->viewLoader  = new ViewLoader(
    "{$app->dir}{$app->ds}" . getenv('DIR_TEMPLATE'),
    array(
        'extension' => getenv('EXTENSION_TEMPLATE')
    )
);
$app->view        = new View(array(
    'loader'    => $app->viewLoader,
    'cache'     => sys_get_temp_dir()
));

//Model
$app->data          = new ArrayObject(array(
    'envJson'     => $app->environment->toJson(),
    'baseUrl'     => (string) $app->url,
    'host'        => (string) $app->url->getHost() ?: getenv('HOST')
) + $app->environment->getValues());

//View
$view = $app->view->render(getenv('ASSET_TEMPLATE'), $app->data);
if (error_get_last() !== null) {
    if (getenv('DEBUG')) {
        exit();
    }
}

echo $view;
