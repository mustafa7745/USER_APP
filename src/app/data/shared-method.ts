import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { ApiFormData } from './form-data';
import { SharedNavigate } from './shared-navigate';
import { GlobalString } from './global-string';
import { Urls } from './urls';
import JSEncrypt from 'jsencrypt';
import { CustomModal } from './shared/modal';
import { CRPT } from '../crpt';
export class SharedMethod {
  customModal = new CustomModal();
  private _platformId = inject(PLATFORM_ID);
  sharedNavigate = new SharedNavigate();
  globalString = new GlobalString();
  apiFormData = new ApiFormData();
  urls = new Urls();
  cate_prod_controller: any;
  jsEncrypt = new JSEncrypt();
  crpt = new CRPT();

  loginLocalstorage = 'islogin';
  browserPlatform(data: () => void) {
    if (isPlatformBrowser(this._platformId)) {
      data();
    }
  }

  decryptAndSetLogin(res: any) {
    const encryptedData = JSON.parse(res);

    var loginTokenData = this.crpt.decrypt(encryptedData.encrypted_data);
    if (loginTokenData != false) {
      this.setLoginData(encryptedData.encrypted_data);
      this.sharedNavigate.navigateToHome();
    }
  }

  setLoginData(data: string) {
    localStorage.setItem(this.loginLocalstorage, data);
  }
  getLoginData() {
    const data = localStorage.getItem(this.loginLocalstorage);
    if (data != null) {
      var loginTokenData = this.crpt.decrypt(data);
      if (loginTokenData == null) {
        return false;
      }

      return loginTokenData;
    }
    return false;
  }
  removeLogin() {
    localStorage.removeItem(this.loginLocalstorage);
  }
  formatTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return 'الان';
    } else if (minutes < 60) {
      return `منذ ${minutes} دقيقة`;
    } else if (hours < 24) {
      return `منذ ${hours} ساعة`;
    } else if (days < 30) {
      return `منذ ${days} يوم`;
    } else if (months < 12) {
      return `منذ ${months} شهر`;
    } else {
      return `منذ ${years} سنة`;
    }
  }
}
