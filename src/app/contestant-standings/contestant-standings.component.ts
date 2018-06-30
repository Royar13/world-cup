import { Component, OnInit } from '@angular/core';
import { ContestantStandingsService } from './contestant-standings.service';
import { Contestant } from '../data/Contestants/Contestant';
import { Router } from '@angular/router';

@Component({
	selector: 'app-contestants-rank',
	templateUrl: './contestant-standings.component.html',
	styleUrls: ['./contestant-standings.component.scss']
})
export class ContestantStandingsComponent implements OnInit {
	public loading: boolean = true;
	public loadingError: boolean = false;
	public addMode: boolean = false;
	public executingSave: boolean = false;
	public executingDeleteId: number;
	public nameField: string;
	public errorMsg: string;

	constructor(public contestantStandingsService: ContestantStandingsService, private router: Router) {

	}

	ngOnInit() {
		this.contestantStandingsService.init().then(() => {
			this.loading = false;
		}, () => {
			this.loadingError = true;
		});
	}

	public addContestantOnClick(): void {
		this.resetFields();
		this.addMode = true;
	}

	public saveContestantOnClick(): void {
		this.errorMsg = "";
		this.executingSave = true;
		this.contestantStandingsService.saveContestant(this.nameField).then(() => {
			this.addMode = false;
			this.executingSave = false;
		}, (err) => {
			this.errorMsg = "* " + err;
			this.executingSave = false;
		});
	}

	public cancelAddOnClick(): void {
		this.resetFields();
		this.addMode = false;
	}

	public editContestantOnClick(contestant: Contestant): void {
		this.router.navigate(["/guesses", contestant.id]);
	}

	public deleteContestantOnClick(contestant: Contestant): void {
		if (confirm("האם אתה בטוח שברצונך למחוק את המתחרה \"" + contestant.name + "\"?")) {
			this.executingDeleteId = contestant.id;
			this.contestantStandingsService.deleteContestant(contestant).then(() => {
				this.executingDeleteId = null;
			}, () => {
				this.executingDeleteId = null;
			});
		}
	}

	private resetFields(): void {
		this.nameField = "";
		this.errorMsg = "";
	}

	public getStandingsDiff(contestant: Contestant): number {
		return contestant.previousRank - contestant.rank;
	}
}
