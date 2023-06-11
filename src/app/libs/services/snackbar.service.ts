import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000, // Duration in milliseconds
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
  }
}
