import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
	@Input() public label: string;
	public selected: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	public toggle(on: boolean): void {
		this.selected = on;
	}

}
