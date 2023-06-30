import { InjectionToken } from "@angular/core";
import {AppConfig} from "../types/AppConfig";

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
