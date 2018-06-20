import { Component, OnInit } from '@angular/core';
import { ContestantStandingsService } from './contestant-standings.service';
import { Contestant } from '../data/Contestants/Contestant';

@Component({
	selector: 'app-contestants-rank',
	templateUrl: './contestant-standings.component.html',
	styleUrls: ['./contestant-standings.component.scss']
})
export class ContestantStandingsComponent implements OnInit {
	public get contestants(): Contestant[] {
		return this.contestantStandingsService.contestants;
	}
	public addMode: boolean = false;
	public executingSave: boolean = false;
	public nameField: string;
	public errorMsg: string;

	constructor(private contestantStandingsService: ContestantStandingsService) {

	}

	ngOnInit() {
		this.contestantStandingsService.getContestants();
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

	private resetFields(): void {
		this.nameField = "";
		this.errorMsg = "";
	}
}
