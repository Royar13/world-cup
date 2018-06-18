import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken("AppConfig");

export interface IAppConfig {
	apiUrl: string;
	worldCupApiUrl: string;
}

export const AppConfig: IAppConfig = {
	apiUrl: "http://localhost:4200/api",
	worldCupApiUrl: "http://worldcup.sfg.io"
};