import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(public domSanitizationService: DomSanitizer) {
  }

  transform(url: string): any {
    return this.domSanitizationService.bypassSecurityTrustResourceUrl(url);
  }
}
