import { Component, OnInit } from '@angular/core';
import { MatchesBetsService } from '../matches-bets.service';
import { FormControl } from '@angular/forms';
import { BetsApiService } from '../../data/Bets/bets-api.service';

@Component({
	selector: 'app-cup-winner-bet',
	templateUrl: './cup-winner-bet.component.html',
	styleUrls: ['./cup-winner-bet.component.scss']
})
export class CupWinnerBetComponent implements OnInit {
	public executingSave: boolean = false;
	public errorMsg: string = "";
	public countryField: string;

	constructor(public matchesBetsService: MatchesBetsService) { }

	ngOnInit() {
	}

	public onSubmit(form: FormControl): void {
		this.errorMsg = "";
		this.executingSave = true;
		this.matchesBetsService.saveCupWinnerBet().then(() => {
			this.executingSave = false;
		}, (err) => {
			this.executingSave = false;
			this.errorMsg = err;
		});
	}
}
