import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { ContestantStandingsComponent } from './contestant-standings/contestant-standings.component';
import { ContestantsApiService } from './data/Contestants/contestants-api.service';
import { APP_CONFIG, AppConfig } from './data/AppConfig';
import { MatchesBetsComponent } from './matches-bets/matches-bets.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CountriesApiService } from './data/Countries/countries-api.service';
import { WorldCupApiService } from './data/WorldCupApi/world-cup-api.service';
import localeHe from '@angular/common/locales/he';
import { registerLocaleData } from '@angular/common';
import { TabGroupComponent } from './common/tab-group/tab-group.component';
import { TabComponent } from './common/tab-group/tab/tab.component';
import { BetsFormComponent } from './matches-bets/bets-form/bets-form.component';

registerLocaleData(localeHe);

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		ContestantStandingsComponent,
		MatchesBetsComponent,
		TabGroupComponent,
		TabComponent,
		BetsFormComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [
		{ provide: APP_CONFIG, useValue: AppConfig }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
