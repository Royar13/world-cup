import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainComponent } from './main/main.component';
import { ContestantStandingsComponent } from './contestant-standings/contestant-standings.component';
import { ContestantsService } from './data/contestants.service';
import { APP_CONFIG, AppConfig } from './data/AppConfig';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		ContestantStandingsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		ContestantsService,
		{ provide: APP_CONFIG, useValue: AppConfig }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
