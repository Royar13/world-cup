import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { GroupStageBet } from '../data/Bets/GroupStageBet';

@Directive({
	selector: '[appBetGoalsValidator]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: BetGoalsValidatorDirective, multi: true }
	]
})
export class BetGoalsValidatorDirective implements Validator {
	@Input() appBetGoalsValidator: GroupStageBet;

	constructor() { }

	validate(control: AbstractControl): { [key: string]: any } | null {
		let valid: boolean = (!this.appBetGoalsValidator.saved && this.appBetGoalsValidator.home_team_goals == null && this.appBetGoalsValidator.away_team_goals == null) ||
			(this.appBetGoalsValidator.home_team_goals != null && this.appBetGoalsValidator.away_team_goals != null);
		return valid ? null : { "betGoals": { value: control.value } };
	}
}
