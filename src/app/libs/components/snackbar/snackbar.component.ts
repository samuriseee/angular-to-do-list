import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(@Inject(MatSnackBar) public snackBar: MatSnackBar) { }

  dismissSnackbar(): void {
    // Dismiss the snackbar
  }
}
