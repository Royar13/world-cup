import { Bet } from "../Bets/Bet";
import { Score } from "../Bets/Score";

export class Contestant {
	public id: number;
	public name: string;
	public winner_bet_country_code: string = null;
	public winnerBetHebrewName: string;
	public score: Score = new Score();
	public previousScore: Score = new Score();
	public rank: number = 0;
	public previousRank: number = 0;
	public bets: Bet[] = new Array();

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	public static fromJSON(obj: any): Contestant {
		let contestant = new Contestant(obj.id, obj.name);
		Object.assign(contestant, obj);
		return contestant;
	}
}