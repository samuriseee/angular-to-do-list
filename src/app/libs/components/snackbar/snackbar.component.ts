import { Component, Input } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  @Input() message: string = '';

}
