import { Pipe, PipeTransform } from '@angular/core';
import { IGlossary } from 'src/app/model/glossary';

@Pipe({
  name: 'groupByAlphabets'
})
export class GroupByPipe implements PipeTransform {

  transform(glossarys: IGlossary[]): Array<{key: string, glossary: IGlossary[]}> {
    if (!glossarys) {
      return;
    }
    const sorted = glossarys && glossarys.sort((a, b) => a.ElementId > b.ElementId ? 1 : -1);
    const grouped = sorted && sorted.reduce((groups, contact) => {
      const letter = contact && contact.ElementId && contact.ElementId.charAt(0);
      groups[letter] = groups[letter] || [];
      groups[letter].push(contact);
      return groups;
    }, {});

    const result = Object.keys(grouped).map(key => ({ key, glossary: grouped && grouped[key] as IGlossary[] }));
    return result;
  }

}
