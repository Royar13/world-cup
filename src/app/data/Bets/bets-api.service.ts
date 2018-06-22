import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupStageBet } from './GroupStageBet';

@Injectable({
	providedIn: 'root'
})
export class BetsApiService {

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public saveGroupStageBets(contestantId: number, bets: GroupStageBet[]): Observable<any> {
		let formData = new FormData();
		formData.append("contestantId", contestantId.toString());
		formData.append("bets", JSON.stringify(bets));
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Bets&action=saveGroupStageBets", formData);
	}
}
