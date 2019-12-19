import { Component, OnInit, Input } from '@angular/core';
import { IGlossary } from 'src/app/model/glossary';
import { GroupByPipe } from 'src/app/core/pipe/groupByPipe/group-by.pipe';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {
  @Input() glossary: IGlossary[];
  sortedGlossary: { key: string, glossary: IGlossary[] }[];
  currentGlossary: { key: string, glossary: IGlossary[] };
  glossaryHeaders: { alphabet: string, canDisable: boolean }[] = [];
  constructor(private groupBy: GroupByPipe) {
  }

  ngOnInit() {
    this.sortedGlossary = this.groupBy.transform(this.glossary);
    this.currentGlossary = this.sortedGlossary[0];
    this.getAlphabetsLinks();
  }

  getAlphabetsLinks() {
    const alphabets = [];
    for (let i = 65; i <= 90; i++) {
      this.glossaryHeaders.push({ alphabet: String.fromCharCode(i), canDisable: false});
    }
      this.glossaryHeaders.map((glossaryHeader: { alphabet: string, canDisable: boolean }) => {
        glossaryHeader.canDisable = this.sortedGlossary.filter(c => c.key === glossaryHeader.alphabet).length === 0;
      });
  }

  getGlossary(alphabet: string) {
    this.currentGlossary = this.sortedGlossary.filter(c => c.key === alphabet)[0];
  }
}
