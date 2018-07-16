import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { ContestantStandingsComponent } from './contestant-standings/contestant-standings.component';
import { APP_CONFIG, AppConfig } from './data/AppConfig';
import { MatchesBetsComponent } from './matches-bets/matches-bets.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localeHe from '@angular/common/locales/he';
import { registerLocaleData } from '@angular/common';
import { TabGroupComponent } from './common/tab-group/tab-group.component';
import { TabComponent } from './common/tab-group/tab/tab.component';
import { BetsFormComponent } from './matches-bets/bets-form/bets-form.component';
import { CupWinnerBetComponent } from './matches-bets/cup-winner-bet/cup-winner-bet.component';
import { LoadingComponent } from './common/loading/loading.component';
import { WorldCupApiService } from './data/WorldCupApi/world-cup-api.service';
import { CachedWorldCupApiService } from './data/WorldCupApi/cached-world-cup-api.service';

registerLocaleData(localeHe);

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		ContestantStandingsComponent,
		MatchesBetsComponent,
		TabGroupComponent,
		TabComponent,
		BetsFormComponent,
		CupWinnerBetComponent,
		LoadingComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [
		{ provide: APP_CONFIG, useValue: AppConfig },
		//use the class CachedWorldCupApiService instead if the api shuts down, to load the cached results from file
		{ provide: WorldCupApiService, useClass: WorldCupApiService }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
