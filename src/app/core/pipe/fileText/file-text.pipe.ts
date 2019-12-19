import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileText'
})
export class FileTextPipe implements PipeTransform {

  transform(fileName: string): string {
    return fileName.split('.').slice(0, -1).join('.');
  }

}
