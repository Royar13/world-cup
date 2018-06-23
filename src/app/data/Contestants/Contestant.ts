import { GroupStageBet } from "../Bets/GroupStageBet";

export class Contestant {
	public id: number;
	public name: string;
	public score: number = 0;
	public previousScore: number = 0;
	public groupStageBets: GroupStageBet[] = new Array();

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	public static fromJSON(obj: any): Contestant {
		let contestant = new Contestant(obj.id, obj.name);
		Object.assign(contestant, obj);
		contestant.id = parseInt(<any>contestant.id);
		return contestant;
	}
}