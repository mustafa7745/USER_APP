import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResquestServer } from '../data/shared/requestServer';
import { StateController } from '../data/shared/stateController';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  requestServer = new ResquestServer();
  stateController = new StateController();

  isSearchMode = false;
  searchText = '';
  //
  isError = false;
  error = '';
  isLoading = true;
  resultData: any[] = [];

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit() {
    this.requestServer.sharedMethod.browserPlatform(async () => {
      // this.read();
      this.getLocation();
    });
  }
  async read() {
    console.log('mustafafaffa');
    // aw;
    // const data2 = this.requestServer.encryptData2();

    // this.isLoading = true;
    // this.isError = false;
    const formData = new FormData();
    //   this.requestServer.sharedMethod.apiFormData.getFormData1();
    // formData.set('data2', data2);
    const data3 = {
      tag: 'read',
    };
    formData.set('data3', JSON.stringify(data3));

    this.requestServer.request(
      formData,
      this.requestServer.sharedMethod.urls.categoriesUrl,
      (res) => {
        this.isLoading = false;
        this.isError = false;
        // this.resultData = res;
        const data = JSON.parse(res);
        this.resultData = data;
      },
      (e) => {
        this.isLoading = false;
        this.isError = true;
        this.error = e;
      }
    );
  }

  latitude: number | undefined;
  longitude: number | undefined;
  errorMessage: string | undefined;

  // ngOnInit(): void {
  //   this.getLocation();
  // }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          this.errorMessage = this.getErrorMessage(error.code);
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  private getErrorMessage(errorCode: number): string {
    switch (errorCode) {
      case GeolocationPositionError.PERMISSION_DENIED:
        return 'User denied the request for Geolocation.';
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case GeolocationPositionError.TIMEOUT:
        return 'The request to get user location timed out.';

      default:
        return 'An unknown error occurred.';
    }
  }
}
