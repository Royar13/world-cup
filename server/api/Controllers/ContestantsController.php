<?php

namespace App\Controllers;

use App\Services\DataAccessService;
use Exception;
use PDO;

class ContestantsController
{
    public function getContestant()
    {
        $id = $_POST["id"];
        $stmt = DataAccessService::getConnection()->prepare("SELECT * FROM contestants WHERE id=:id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($row);
    }

    public function getContestants()
    {
        $result = DataAccessService::getConnection()->query("SELECT * FROM contestants");
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }

    public function createContestant()
    {
        $output = array("success" => true);

        DataAccessService::getConnection()->beginTransaction();
        try {
            $name = $_POST["name"];
            $errorMsg = "";
            $valid = $this->validateName($name, $errorMsg);

            if ($valid) {
                $stmt = DataAccessService::getConnection()->prepare("INSERT INTO contestants(name) VALUES(:name)");
                $stmt->bindParam(":name", $name);
                $stmt->execute();
                $lastId = DataAccessService::getConnection()->lastInsertId();
                $output["id"] = $lastId;
            } else {
                $output["success"] = false;
                $output["error"] = $errorMsg;
            }
            DataAccessService::getConnection()->commit();
        } catch (Exception $e) {
            DataAccessService::getConnection()->rollBack();
            $output["success"] = false;
            $output["error"] = "ארעה שגיאה בשמירת המידע";
        }

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
