import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MatchesBetsComponent } from './matches-bets/matches-bets.component';
import { CanDeactivateGuardService } from './common/can-deactivate-guard.service';

const routes: Routes = [
	{ path: "", component: MainComponent },
	{ path: "guesses/:id", component: MatchesBetsComponent, canDeactivate: [CanDeactivateGuardService] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [CanDeactivateGuardService]
})
export class AppRoutingModule { }
