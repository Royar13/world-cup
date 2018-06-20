<?php

namespace App\Controllers;

use App\Services\DataAccessService;
use PDO;

class ContestantsController
{
    public function getContestants()
    {
        $result = DataAccessService::getConnection()->query("SELECT * FROM contestants");
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }

    public function createContestant()
    {
        $valid = true;
        $name = $_POST["name"];
        $errorMsg = "";
        if (!$this->validateName($name, $errorMsg)) {
            $valid = false;
        }

        if ($valid) {
            $stmt = DataAccessService::getConnection()->prepare("INSERT INTO contestants(name) VALUES(:name)");
            $stmt->bindParam(":name", $name);
            $stmt->execute();
            $lastId = DataAccessService::getConnection()->lastInsertId();
            $output["id"] = $lastId;
        } else {
            $output["error"] = $errorMsg;
        }
        $output["success"] = $valid;

        echo json_encode($output);
    }

    private function validateName(&$name, &$errorMsg)
    {
        if (!isset($name)) {
            throw new Exception("The request is missing a name parameter");
        }
        if (empty($name)) {
            $errorMsg = "יש להזין שם";
            return false;
        }
        $name = trim($name);
        if (!preg_match("/^([א-ת]+\s?)+$/", $name)) {
            $errorMsg = "השם צריך להיות בעברית";
            return false;
        }

        $stmt = DataAccessService::getConnection()->prepare("SELECT count(*) FROM contestants WHERE name=:name");
        $stmt->bindParam(":name", $name);
        $stmt->execute();
        if ($stmt->fetchColumn() > 0) {
            $errorMsg = "השם קיים כבר במערכת";
            return false;
        }
        return true;
    }
}
