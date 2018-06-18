<?php

require __DIR__ . "/../vendor/autoload.php";

if (!isset($_GET["controller"]) || !isset($_GET["action"])) {
    throw new Exception("The controller or action parameters are missing");
}
$controllerName = "\\App\\Controllers\\" . sanitizeEnglish($_GET["controller"]) . "Controller";
$actionName = sanitizeEnglish($_GET["action"]);

if (class_exists($controllerName)) {
    $controller = new $controllerName();
    if (method_exists($controller, $actionName)) {
        $controller->$actionName();
    } else {
        throw new Exception("The action \"{$actionName}\" doesn't exist in controller \"{$controllerName}\"");
    }
} else {
    throw new Exception("The controller \"{$controllerName}\" doesn't exist");
}

function sanitizeEnglish($str)
{
    $str = preg_replace('/[^\00-\255]+/u', '', $str);
    return $str;
}
