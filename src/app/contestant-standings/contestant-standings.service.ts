import { Injectable } from '@angular/core';
import { ContestantsApiService } from '../data/Contestants/contestants-api.service';
import { Contestant } from '../data/Contestants/Contestant';

@Injectable({
	providedIn: 'root'
})
export class ContestantStandingsService {
	public contestants: Contestant[] = new Array();

	constructor(private contestansAccessService: ContestantsApiService) {

	}

	public getContestants(): Promise<Contestant[]> {
		return this.contestansAccessService.getContestants().toPromise().then((contestants) => {
			this.contestants = contestants;
			return this.contestants;
		});
	}

	public saveContestant(name: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.contestansAccessService.createContestant(name).subscribe(response => {
				if (response.success) {
					let newContestant: Contestant = new Contestant(response.id, name);
					this.contestants.push(newContestant);
					resolve();
				}
				else {
					reject(response.error);
				}
			}, () => {
				reject("ארעה שגיאה בשמירת המתחרה");
			});
		});
	}
}
