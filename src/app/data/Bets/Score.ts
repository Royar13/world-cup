import { Stage } from "../WorldCupApi/Stage";

export class Score {
	private _total: number = 0;
	public get total(): number {
		return this._total;
	}
	private scoreByStage: Map<string, number> = new Map();

	public addPoints(stage: string, amount: number): void {
		if (!this.scoreByStage.has(stage)) {
			this.scoreByStage.set(stage, 0);
		}
		this.scoreByStage.set(stage, this.scoreByStage.get(stage) + amount);
		this._total += amount;
	}

	public getScoreByStage(stage: string): number {
		let score = this.scoreByStage.get(stage);
		if (score === undefined) {
			score = 0;
		}
		return score;
	}
}