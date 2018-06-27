import { Component, OnInit, QueryList, ContentChildren } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
	selector: 'app-tab-group',
	templateUrl: './tab-group.component.html',
	styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {
	@ContentChildren(TabComponent) private tabs: QueryList<TabComponent>;
	public selectedIndex: number = 0;
	private tabsArr: TabComponent[];
	public labels: string[] = new Array();

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.tabsArr = this.tabs.toArray();
		this.tabsArr.forEach((tab, index) => {
			this.labels[index] = tab.label;
		});
		this.selectTab(this.selectedIndex);
	}

	public selectTab(index: number): void {
		this.selectedIndex = index;
		this.tabsArr.forEach((tab, index) => {
			this.labels[index] = tab.label;
			let selected: boolean = index === this.selectedIndex;
			this.tabsArr[index].toggle(selected);
		});
	}

	public getZIndex(index: number): number {
		return this.tabsArr.length - index;
	}

}
