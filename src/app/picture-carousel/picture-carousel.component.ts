import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-picture-carousel',
  templateUrl: './picture-carousel.component.html',
  styleUrls: ['./picture-carousel.component.scss'],
})
export class PictureCarouselComponent implements OnInit {

  pictureList: any [];
  counter = 0;
  constructor(
    public dialogRef: MatDialogRef<PictureCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.pictureList = [];
    this.pictureList.push(this.data.currentImage);
    const pictureList : any[] = this.data.imageList;
    pictureList.forEach(photo => {
      if(photo.imageRef !== this.data.currentImage){
        this.pictureList.push(photo.imageRef);
      }
    })
  }

  nextPicture() {
    this.counter = this.counter + 1;
    console.log("pictureList", this.pictureList);
    if (this.counter >= this.pictureList.length) {
      this.counter = 0;
    }
  }

  prevPicture() {
    this.counter = this.counter - 1;
    if (this.counter < 0) {
      this.counter = this.pictureList.length - 1;
    }
  }
}
