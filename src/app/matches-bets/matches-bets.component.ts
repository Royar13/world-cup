import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchesBetsService } from './matches-bets.service';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-matches-bets',
	templateUrl: './matches-bets.component.html',
	styleUrls: ['./matches-bets.component.scss']
})
export class MatchesBetsComponent implements OnInit, OnDestroy {
	public loading: boolean = true;
	public errorMsg: string;
	public executingSave: boolean = false;
	private subs: Subscriber<any>[] = new Array();

	constructor(public matchesBetsService: MatchesBetsService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.matchesBetsService.init(parseInt(params["id"])).then(() => {
				this.loading = false;
			});
		});
	}

	ngOnDestroy(): void {
		this.subs.forEach(s => s.unsubscribe());
	}

	public onSubmit(groupStageBetsForm: FormControl): void {
		if (groupStageBetsForm.valid) {
			this.errorMsg = "";
			this.executingSave = true;
			this.matchesBetsService.saveGroupStageBets().then(() => {
				this.executingSave = false;
			}, (err) => {
				this.errorMsg = "* " + err;
				this.executingSave = false;
			});
		}
		else {
			let filledBets = this.matchesBetsService.getFilledBets();
			filledBets.forEach(bet => {
				bet.submitted = true;
			});
			document.getElementsByClassName("bet-field-group ng-invalid").item(0).parentElement.scrollIntoView();
		}
	}
}
