import { Component, OnInit } from '@angular/core';
import { MatchesBetsService } from './matches-bets.service';

@Component({
	selector: 'app-matches-bets',
	templateUrl: './matches-bets.component.html',
	styleUrls: ['./matches-bets.component.scss']
})
export class MatchesBetsComponent implements OnInit {
	public finishedLoading: boolean = false;

	constructor(public matchesBetsService: MatchesBetsService) {
	}

	ngOnInit() {
		this.matchesBetsService.getGroupStageBets().then(() => {
			this.finishedLoading = true;
		});
	}

}
