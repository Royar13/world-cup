import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { ContestantStandingsComponent } from './contestant-standings/contestant-standings.component';
import { ContestantsService } from './data/Contestants/contestants.service';
import { APP_CONFIG, AppConfig } from './data/AppConfig';
import { MatchesBetsComponent } from './matches-bets/matches-bets.component';
import { HttpClientModule } from '@angular/common/http';
import { CountriesService } from './data/Countries/countries.service';
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
		ContestantsService,
		WorldCupApiService,
		CountriesService,
		{ provide: APP_CONFIG, useValue: AppConfig }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
