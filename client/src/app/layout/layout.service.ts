import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
    constructor(private readonly snackbar: MatSnackBar) { }

    showSnackbar(message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }
}
