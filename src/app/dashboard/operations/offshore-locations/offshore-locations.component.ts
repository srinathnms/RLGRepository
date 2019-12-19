import { Component, OnInit, Input } from '@angular/core';
import { IDocument } from 'src/app/model/document';

@Component({
  selector: 'app-offshore-locations',
  templateUrl: './offshore-locations.component.html',
  styleUrls: ['./offshore-locations.component.css']
})
export class OffshoreLocationsComponent implements OnInit {
  @Input() offshoreLocations: IDocument[];
  constructor() {
  }

  ngOnInit() {
  }

}
