<?php
$loader = require_once 'vendor/autoload.php';

use Nod\Environment;
use League\Url\Url;

$environment = new Environment;
$url         = Url::createFromServer($_SERVER);

echo (new Mustache_Engine(
    array(
        'loader' => new Mustache_Loader_FilesystemLoader(
            __DIR__ . DIRECTORY_SEPARATOR . getenv('DIR_MUSTACHE')
        )
    )
))->render(getenv('ASSET_MUSTACHE'), array(
    'title'       => getenv('INFO_NAME'),
    'description' => "Ready for a new shiny project.",
    'env'         => $environment->getValues(),
    'envJson'     => $environment->toJson(),
    'baseUrl'     => $url
) + $environment->getValues());
