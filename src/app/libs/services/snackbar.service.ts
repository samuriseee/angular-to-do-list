import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  showSnackBar(message: string, action: string, backgroundColor: string): void {
    const config: MatSnackBarConfig = {
      duration: 9000,
      panelClass: ['custom-snackbar'],
    };

    this.snackBar.open(message, action, config);
  }
}
