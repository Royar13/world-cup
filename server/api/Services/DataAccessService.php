<?php
namespace App\Services;

use App\Config;
use PDO;

class DataAccessService
{
    private static $connection;

    public static function getConnection()
    {
        if (self::$connection == null) {
            try {
                self::$connection = new PDO("mysql:host=" . Config::$dbServerName . ";dbname=" . Config::$dbName, Config::$dbUserName, Config::$dbPassword);
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$connection->query("SET NAMES 'utf8'");
            } catch (Exception $e) {
                throw new Exception("Failed to connect to the database: " . $e->getMessage());
            }
        }
        return self::$connection;
    }
}
