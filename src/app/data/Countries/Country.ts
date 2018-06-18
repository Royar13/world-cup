export class Country {
	public fifa_code: string;
	public hebrew_name: string;

	public static fromJSON(obj: any): Country {
		let country = new Country();
		return Object.assign(country, obj);
	}
}