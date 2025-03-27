import { Component, OnInit } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
})
export class SwiperComponent implements OnInit {
  arraySwiper: Array<string> = [];
  ngOnInit(): void {
    this.arraySwiper.push('../../../assets/4028.jpg');
    this.arraySwiper.push('../../../assets/4029.jpg');
    this.arraySwiper.push('../../../assets/4027.jpg');
  }
}
