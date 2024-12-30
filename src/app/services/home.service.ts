import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  isSaveDisabled: boolean = true;
  shouldShowAlert: boolean = false;

  checkForMissingData(credits: { role: string; name: string }[]): void {
    const missingData = credits.some((credit) => !credit.name);
    this.isSaveDisabled = missingData;
    if (missingData && this.shouldShowAlert) {
      Swal.fire({
        title: 'Missing Data!',
        text: 'Some credits are missing data. Please edit the missing fields.',
        icon: 'warning',
        color: '#666666',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#051E3A',
      });
    }
  }
}