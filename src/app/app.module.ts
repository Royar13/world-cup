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
import { BetGoalsValidatorDirective } from './matches-bets/bet-goals-validator.directive';

registerLocaleData(localeHe);

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		ContestantStandingsComponent,
		MatchesBetsComponent,
		BetGoalsValidatorDirective
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
