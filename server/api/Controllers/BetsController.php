<?php

namespace App\Controllers;

use App\Services\DataAccessService;
use Exception;

class BetsController
{
    public function saveGroupStageBets()
    {
        $output = array("success" => true);

        DataAccessService::getConnection()->beginTransaction();
        try {
            $contestantId = $_POST["contestantId"];
            $bets = json_decode($_POST["bets"]);

            $valid = $this->validateContestantId($contestantId) && $this->validateBets($bets);

            if ($valid) {
                foreach ($bets as $bet) {
                    $stmt = DataAccessService::getConnection()->prepare(
                        "INSERT INTO group_stage_bets(contestant_id, fifa_match_id, home_team_goals, away_team_goals)
						VALUES(:contestant_id, :fifa_match_id, :home_team_goals, :away_team_goals)
						ON DUPLICATE KEY UPDATE home_team_goals=:home_team_goals, away_team_goals=:away_team_goals"
                    );
                    $stmt->bindParam(":contestant_id", $contestantId);
                    $stmt->bindParam(":fifa_match_id", $bet->fifa_match_id);
                    $stmt->bindParam(":home_team_goals", $bet->home_team_goals);
                    $stmt->bindParam(":away_team_goals", $bet->away_team_goals);
                    $stmt->execute();
                }
            } else {
                $output["success"] = false;
            }
            DataAccessService::getConnection()->commit();
        } catch (Exception $e) {
            DataAccessService::getConnection()->rollBack();
            $output["success"] = false;
            $output["error"] = "ארעה שגיאה בשמירת המידע";
        }

        echo json_encode($output);
    }

    private function validateContestantId($id)
    {
        $stmt = DataAccessService::getConnection()->prepare("SELECT count(*) FROM contestants WHERE id=:id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        if ($stmt->fetchColumn() == 0) {
            throw new Exception("A contestant with the provided id doesn't exist");
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
        return true;
    }
}
