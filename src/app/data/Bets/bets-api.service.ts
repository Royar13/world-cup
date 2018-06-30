import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bet } from './Bet';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BetsApiService {

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getBets(): Observable<Bet[]> {
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=getBets", {}).pipe(
			map((res: any[]): Bet[] => {
				return res.map(b => Bet.fromJSON(b));
			}));
	}

	public getBetsContestant(contestantId: number): Observable<Bet[]> {
		let formData = new FormData();
		formData.append("contestantId", contestantId.toString());
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=getBetsByContestant", formData).pipe(
			map((res: any[]): Bet[] => {
				return res.map(b => Bet.fromJSON(b));
			}));
	}

	public saveBets(contestantId: number, bets: Bet[]): Observable<any> {
		let formData = new FormData();
		formData.append("contestantId", contestantId.toString());
		formData.append("bets", JSON.stringify(bets));
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=saveBets", formData);
	}

	public saveCupWinnerBet(contestantId: number, countryCode: string): Observable<any> {
		let formData = new FormData();
		formData.append("contestantId", contestantId.toString());
		formData.append("countryCode", countryCode);
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=saveCupWinnerBet", formData);
	}
}
