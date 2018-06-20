export class Contestant {
	public id: number;
	public name: string;
	public score: number = 0;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	public static fromJSON(obj: any): Contestant {
		let contestant = new Contestant(obj.id, obj.name);
		return Object.assign(contestant, obj);
	}
}