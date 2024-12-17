import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(message: string, title: string = 'Success') {
    Swal.fire(title, message, 'success');
  }

  error(message: string, title: string = 'Error') {
    Swal.fire(title, message, 'error');
  }

  warning(message: string, title: string = 'Warning') {
    Swal.fire(title, message, 'warning');
  }

  info(message: string, title: string = 'Info') {
    Swal.fire(title, message, 'info');
  }

  confirm(
    message: string,
    confirmCallback: () => void,
    cancelCallback: () => void = () => {}
  ) {
    Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      } else {
        cancelCallback();
      }
    });
  }
}
