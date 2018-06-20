<?php

namespace App\Controllers;

use App\Services\DataAccessService;
use PDO;

class CountriesController
{
    public function getCountries()
    {
        $result = DataAccessService::getConnection()->query("SELECT * FROM countries");
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }
}
