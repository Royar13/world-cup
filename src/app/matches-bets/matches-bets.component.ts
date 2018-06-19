import { Component, OnInit } from '@angular/core';
import { WorldCupApiService } from '../data/WorldCupApi/world-cup-api.service';

@Component({
	selector: 'app-matches-bets',
	templateUrl: './matches-bets.component.html',
	styleUrls: ['./matches-bets.component.scss']
})
export class MatchesBetsComponent implements OnInit {
	public finishedLoading: boolean = false;

	constructor(public worldCupApiService: WorldCupApiService) {
	}

	ngOnInit() {
		this.worldCupApiService.getMatches().then(() => {
			this.finishedLoading = true;
		});
	}

}
