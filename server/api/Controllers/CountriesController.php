<?php

namespace App\Controllers;

use PDO;
use App\Services\DataAccessService;

class CountriesController
{
    public function getCountries()
    {
        $result = DataAccessService::getConnection()->query("SELECT * from countries");
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        echo \json_encode($rows);
    }
}
