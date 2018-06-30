import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
	@Input() public error: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	public refreshPage(): void {
		window.location.reload();
	}

}
