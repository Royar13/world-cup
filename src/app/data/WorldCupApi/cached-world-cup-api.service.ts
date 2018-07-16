import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorldCupApi } from './world-cup-api.service';

@Injectable()
export class CachedWorldCupApiService extends WorldCupApi {
	protected get matchesUrl(): string {
		return "assets/cached-matches-api.json";
	}

	constructor(http: HttpClient) {
		super(http);
	}
}
