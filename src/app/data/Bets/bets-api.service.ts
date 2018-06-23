import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupStageBet } from './GroupStageBet';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BetsApiService {

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getGroupStageBets(): Observable<GroupStageBet[]> {
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=getGroupStageBets", {}).pipe(
			map((res: any[]): GroupStageBet[] => {
				return res.map(b => GroupStageBet.fromJSON(b));
			}));
	}

	public getGroupStageBetsByContestant(contestantId: number): Observable<GroupStageBet[]> {
		let formData = new FormData();
		formData.append("contestantId", contestantId.toString());
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=getGroupStageBetsByContestant", formData).pipe(
			map((res: any[]): GroupStageBet[] => {
				return res.map(b => GroupStageBet.fromJSON(b));
			}));
	}

	public saveGroupStageBets(contestantId: number, bets: GroupStageBet[]): Observable<any> {
		let formData = new FormData();
		formData.append("contestantId", contestantId.toString());
		formData.append("bets", JSON.stringify(bets));
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=saveGroupStageBets", formData);
	}
}
