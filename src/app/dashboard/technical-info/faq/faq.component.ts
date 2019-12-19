import { Component, OnInit, Input } from '@angular/core';
import { IFaq } from 'src/app/model/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  @Input() faq: IFaq[];
  faqList: IFaq[];
  selectedFaq: IFaq;
  constructor() {
  }

  ngOnInit() {
    this.faqList = this.faq;
  }

  onFaqSelection(faq: IFaq) {
    if (this.selectedFaq !== faq) {
      this.selectedFaq = faq;
      return;
    }
    this.selectedFaq = null;
  }
}
