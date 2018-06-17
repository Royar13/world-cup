import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../data/Matches/matches.service';

@Component({
	selector: 'app-matches-bets',
	templateUrl: './matches-bets.component.html',
	styleUrls: ['./matches-bets.component.scss']
})
export class MatchesBetsComponent implements OnInit {

	constructor(public matchesService: MatchesService) {
	}

	ngOnInit() {
	}

}
