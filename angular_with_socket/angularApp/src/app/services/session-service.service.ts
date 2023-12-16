import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  isBrowser: boolean | undefined;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  storeSession(data: any) {
    var sessionData = {
      "tokens": "",
      "userName": "",
      "userAvater": ""
    };

    if (this.isBrowser) {
      localStorage.setItem("accessTokensNg", JSON.stringify(sessionData));
    }

    window.location.reload();
  }

  destroySession() {
    console.log("destroy session");

    if (this.isBrowser) {
      localStorage.removeItem("accessTokensNg");
    }

    window.location.reload();
  }

  isLogdin() {
    var accessTokens = null;
    if (this.isBrowser) {
      accessTokens = localStorage.getItem("accessTokensNg");
    }
    if (accessTokens == null) {
      return false;
    } else {
      // console.log(JSON.parse(accessTokens));
      return true;
    }
  }

  getAccessToken() {
    var accessTokens = null;
    if (this.isBrowser) {
      accessTokens = localStorage.getItem("accessTokensNg");
    }
    if (accessTokens == null) {
      return "";
    } else {
      var tokens = JSON.parse(accessTokens);
      var accessToken = tokens.tokens.accessToken;
      return accessToken;
    }
  }
}
