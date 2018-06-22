import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contestant } from './Contestant';
import { APP_CONFIG, IAppConfig } from '../AppConfig';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class ContestantsApiService {
	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig, private http: HttpClient) {

	}

	public getContestant(id: number): Observable<Contestant> {
		let formData = new FormData();
		formData.append("id", id.toString());
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Contestants&action=getContestant", formData).pipe(
			map((res: any): Contestant => {
				return Contestant.fromJSON(res);
			}));
	}

	public getContestants(): Observable<Contestant[]> {
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Contestants&action=getContestants", {}).pipe(
			map((res: any): Contestant[] => {
				return res.map(c => Contestant.fromJSON(c));
			}));
	}

	public createContestant(name: string): Observable<any> {
		let formData = new FormData();
		formData.append("name", name);
		return this.http.post(this.appConfig.apiUrl + "/index.php?controller=Contestants&action=createContestant", formData);
	}
}
