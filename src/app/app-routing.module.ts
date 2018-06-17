import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MatchesBetsComponent } from './matches-bets/matches-bets.component';

const routes: Routes = [
	{ path: "", component: MainComponent },
	{ path: "guesses", component: MatchesBetsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
