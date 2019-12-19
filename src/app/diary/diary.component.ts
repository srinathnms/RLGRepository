import { Component, OnInit } from "@angular/core";
import { Gallery, GalleryItem, ImageSize } from "@ngx-gallery/core";
import { Lightbox, LightboxModule } from "@ngx-gallery/lightbox";
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { IDiaryImage } from 'src/app/model/diaryImage';

@Component({
  selector: "app-diary",
  templateUrl: "./diary.component.html",
  styleUrls: ["./diary.component.css"]
})
export class DiaryComponent implements OnInit {
  items: GalleryItem[];
  diaryImages: IDiaryImage[];

  constructor(public gallery: Gallery, public lightbox: Lightbox, private dashboardService: DashboardService) {
    const imageQuery = '?$select=EncodedAbsUrl,ImageLabel';
    this.dashboardService.getAttachments('Photos', imageQuery)
      .subscribe((imageUrls: IDiaryImage[]) => {
        this.diaryImages = imageUrls;
      });
  }

  ngOnInit() {
    const lightboxRef = this.gallery.ref("lightbox");
    lightboxRef.setConfig({
      dots: true,
      dotsPosition: "top",
      counter: false,
      loadingMode: "indeterminate",
      imageSize: ImageSize.Contain,
      thumb: false
    });
    lightboxRef.load(this.items);
  }
}