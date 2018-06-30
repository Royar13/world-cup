import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatchesBetsService } from '../matches-bets.service';
import { Bet } from '../../data/Bets/Bet';

@Component({
	selector: 'app-bets-form',
	templateUrl: './bets-form.component.html',
	styleUrls: ['./bets-form.component.scss']
})
export class BetsFormComponent implements OnInit {
	public errorMsg: string;
	public executingSave: boolean = false;
	public submittedBets: boolean = false;
	@Input() stages: string[];
	public get bets(): Bet[] {
		return this.matchesBetsService.bets.filter(b => this.stages.indexOf(b.match.stage_name) >= 0);
	}

	constructor(private matchesBetsService: MatchesBetsService) {

	}

	ngOnInit() {
	}

	public onSubmit(groupStageBetsForm: FormControl): void {
		if (groupStageBetsForm.valid) {
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

}
