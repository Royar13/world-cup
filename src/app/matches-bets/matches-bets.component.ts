import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchesBetsService } from './matches-bets.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CanComponentDeactivate } from '../common/can-deactivate-guard.service';

@Component({
	selector: 'app-matches-bets',
	templateUrl: './matches-bets.component.html',
	styleUrls: ['./matches-bets.component.scss']
})
export class MatchesBetsComponent implements OnInit, OnDestroy, CanComponentDeactivate {
	public loading: boolean = true;
	private subs: Subscription[] = new Array();

	constructor(public matchesBetsService: MatchesBetsService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.subs.push(this.route.params.subscribe(params => {
			this.loading = true;
			this.matchesBetsService.init(parseInt(params["id"])).then(() => {
				this.loading = false;
			});
		}));
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
	}

	canDeactivate(): boolean {
		if (this.matchesBetsService.hasChanged()) {
			return confirm("השינויים שביצעת לא נשמרו. האם אתה בטוח שברצונך לעזוב את הדף?");
		}
		return true;
	}
}
