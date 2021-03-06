import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatchesBetsService } from '../matches-bets.service';
import { Bet } from '../../data/Bets/Bet';
import { Stage } from '../../data/WorldCupApi/Stage';

@Component({
	selector: 'app-bets-form',
	templateUrl: './bets-form.component.html',
	styleUrls: ['./bets-form.component.scss']
})
export class BetsFormComponent implements OnInit {
	public errorMsg: string;
	public executingSave: boolean = false;
	public submittedBets: boolean = false;
	public stageEnum = Stage;
	@Input() stages: string[];
	public get bets(): Bet[] {
		return this.matchesBetsService.bets.filter(b => this.stages.indexOf(b.match.stage_name) >= 0);
	}

	constructor(private matchesBetsService: MatchesBetsService) {

	}

	ngOnInit() {
	}

	public onSubmit(betsForm: FormControl): void {
		if (betsForm.valid) {
			this.errorMsg = "";
			this.executingSave = true;
			this.matchesBetsService.saveBets(this.bets).then(() => {
				this.executingSave = false;
				this.submittedBets = false;
			}, (err) => {
				this.errorMsg = "* " + err;
				this.executingSave = false;
			});
		}
		else {
			this.submittedBets = true;
			document.getElementsByClassName("bet-field ng-invalid").item(0).parentElement.scrollIntoView();
		}
	}

	public showChooseBetWinner(bet: Bet): boolean {
		return this.stages.indexOf(Stage.Groups) < 0 && bet.isFilled() && bet.home_team_goals === bet.away_team_goals;
	}

	public isChooseBetWinnerValid(bet: Bet): boolean {
		return !this.showChooseBetWinner(bet) || bet.winner_country_code !== null;
	}
}
