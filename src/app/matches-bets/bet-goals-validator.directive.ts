import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
	selector: '[appBetGoalsValidator]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: BetGoalsValidatorDirective, multi: true }
	]
})
export class BetGoalsValidatorDirective implements Validator {
	@Input() appBetGoalsValidator: number;
	@Input("awayTeamGoals") awayTeamGoals: number;

	constructor() { }

	validate(control: AbstractControl): { [key: string]: any } | null {
		let valid: boolean = (this.awayTeamGoals == null && this.appBetGoalsValidator == null) || (this.awayTeamGoals != null && this.appBetGoalsValidator != null);
		return valid ? null : { "betGoals": { value: control.value } };
	}
}
