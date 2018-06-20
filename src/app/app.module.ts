import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { ContestantStandingsComponent } from './contestant-standings/contestant-standings.component';
import { ContestantsAccessService } from './data/Contestants/contestants-access.service';
import { APP_CONFIG, AppConfig } from './data/AppConfig';
import { MatchesBetsComponent } from './matches-bets/matches-bets.component';
import { HttpClientModule } from '@angular/common/http';
import { CountriesAccessService } from './data/Countries/countries-access.service';
import { WorldCupApiService } from './data/WorldCupApi/world-cup-api.service';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		ContestantStandingsComponent,
		MatchesBetsComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [
		ContestantsAccessService,
		WorldCupApiService,
		CountriesAccessService,
		{ provide: APP_CONFIG, useValue: AppConfig }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
