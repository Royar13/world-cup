import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken("AppConfig");

export interface IAppConfig {
	baseUrl: string;
	worldCupApiUrl: string;
}

export const AppConfig: IAppConfig = {
	baseUrl: "http://localhost:4200",
	worldCupApiUrl: "http://worldcup.sfg.io"
};