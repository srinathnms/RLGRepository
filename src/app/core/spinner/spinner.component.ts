import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isLoading = false;
  color = 'primary';
  mode = 'indeterminate';
  constructor(private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.showSpinnerSubject.subscribe((requestCount: number) => {
      setTimeout(() => {
        this.isLoading = requestCount > 0;
      });
    });
  }
}
