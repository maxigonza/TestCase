import { HttpClient } from '@angular/common/http';
import {Inject, Injectable } from '@angular/core';
import {APP_CONFIG} from "../providers/config.provider";
import {AppConfig} from "../types/AppConfig";

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { }

  getIsAdminSelection() {
    return this.http.get(`${this.config.apiEndpoint}/masterdata/isadminselection`);
  }
}
