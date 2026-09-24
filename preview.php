<?php
$apps = json_decode(file_get_contents(__DIR__ . '/data/apps.json'), true);
foreach ($apps as $app) {
    echo $app['name'] . " :: " . $app['bundleId'] . PHP_EOL;
}
