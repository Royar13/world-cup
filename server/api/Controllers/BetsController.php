<?php

namespace App\Controllers;

use App\Services\DataAccessService;
use Exception;
use PDO;

class BetsController
{
    public function getBets()
    {
        $result = DataAccessService::getConnection()->query("SELECT * FROM bets");
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }

    public function getBetsByContestant()
    {
        $contestantId = $_POST["contestantId"];
        $stmt = DataAccessService::getConnection()->prepare("SELECT * FROM bets WHERE contestant_id=:contestant_id");
        $stmt->bindParam(":contestant_id", $contestantId);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($row);
    }

    public function saveBets()
    {
        $output = array("success" => true);

        DataAccessService::getConnection()->beginTransaction();
        try {
            $contestantId = $_POST["contestantId"];
            $bets = json_decode($_POST["bets"]);
            $errorMsg = "";

            $valid = $this->validateContestantId($contestantId, $errorMsg) && $this->validateBets($bets);

            if ($valid) {
                foreach ($bets as $bet) {
                    $stmt = DataAccessService::getConnection()->prepare("INSERT INTO bets(contestant_id, fifa_match_id, home_team_goals, away_team_goals, winner_country_code)
					VALUES(:contestant_id, :fifa_match_id, :home_team_goals, :away_team_goals, :winner_country_code)
					ON DUPLICATE KEY UPDATE home_team_goals=VALUES(home_team_goals), away_team_goals=VALUES(away_team_goals), winner_country_code=VALUES(winner_country_code)");
                    $stmt->bindParam(":contestant_id", $contestantId);
                    $stmt->bindParam(":fifa_match_id", $bet->fifa_match_id);
                    $stmt->bindParam(":home_team_goals", $bet->home_team_goals);
                    $stmt->bindParam(":away_team_goals", $bet->away_team_goals);
                    $winnerCode = null;
                    if (isset($bet->winner_country_code)) {
                        $winnerCode = $bet->winner_country_code;
                    }
                    $stmt->bindParam(":winner_country_code", $winnerCode);
                    $stmt->execute();
                }
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

    public function saveCupWinnerBet()
    {
        $output = array("success" => true);

        DataAccessService::getConnection()->beginTransaction();
        try {
            $contestantId = $_POST["contestantId"];
            $countryCode = $_POST["countryCode"];
            $valid = $this->validateCountryExists($countryCode);
            if ($valid) {
                $stmt = DataAccessService::getConnection()->prepare("UPDATE contestants SET winner_bet_country_code=:winner_bet_country_code WHERE id=:id");
                $stmt->bindParam(":id", $contestantId);
                $stmt->bindParam(":winner_bet_country_code", $countryCode);
                $stmt->execute();
            } else {
                throw new Exception("Invalid country code");
            }
            DataAccessService::getConnection()->commit();
        } catch (Exception $e) {
            DataAccessService::getConnection()->rollBack();
            $output["success"] = false;
            $output["error"] = "ארעה שגיאה בשמירת המידע";
        }
        echo json_encode($output);
    }

    private function validateContestantId($id, &$error)
    {
        $stmt = DataAccessService::getConnection()->prepare("SELECT count(*) FROM contestants WHERE id=:id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        if ($stmt->fetchColumn() == 0) {
            $error = "המתחרה נמחק ולכן אין אפשרות לשמור עבורו ניחושים";
            return false;
        }
        return true;
    }

    private function validateBets($bets)
    {
        if (!is_array($bets) || count($bets) == 0) {
            throw new Exception("The bets parameter is not an array");
        }
        foreach ($bets as $bet) {
            if (!$this->validateBet($bet)) {
                return false;
            }
        }
        return true;
    }

    private function validateBet($bet)
    {
        if (!isset($bet->fifa_match_id) || !is_numeric($bet->fifa_match_id) || $bet->fifa_match_id < 0) {
            throw new Exception("The fifa_match_id is not a valid number");
        }
        if (!isset($bet->home_team_goals) || !is_numeric($bet->home_team_goals) || $bet->home_team_goals < 0) {
            throw new Exception("The home_team_goals is not a valid number");
        }
        if (!isset($bet->away_team_goals) || !is_numeric($bet->away_team_goals) || $bet->away_team_goals < 0) {
            throw new Exception("The away_team_goals is not a valid number");
        }
        if (isset($bet->winner_country_code) && !$this->validateCountryExists($bet->winner_country_code)) {
            throw new Exception("The winner's country code doesn't exist");
        }
        return true;
    }

    private function validateCountryExists($countryCode)
    {
        $stmt = DataAccessService::getConnection()->prepare("SELECT count(*) FROM countries WHERE fifa_code=:fifa_code");
        $stmt->bindParam(":fifa_code", $countryCode);
        $stmt->execute();
        return $stmt->fetchColumn() != 0;
    }
}
