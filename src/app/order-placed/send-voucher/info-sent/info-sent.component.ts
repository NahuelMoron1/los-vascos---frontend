import { Component, OnInit, inject } from '@angular/core';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-info-sent',
  templateUrl: './info-sent.component.html',
  styleUrls: ['./info-sent.component.css']
})
export class InfoSentComponent implements OnInit {
  imgURL = '../../../../assets/gym';
  image: any = ';'
  images: Array<any> = [];
  imgNODE = '';
  voucherService = inject(VoucherService);
  async ngOnInit() {
      this.image = await this.readProducts();
      console.log(this.image);
      
  }
  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;

      }
      this.image = file;
    }
  }
  sendData(){
    const formData = new FormData();
    formData.append('file', this.image);
    console.log(formData);
    
    this.voucherService.saveVoucher(formData).subscribe((res)=> {
      console.log(res);
      this.imgNODE = res.file
    });
  }
  async readProducts() {
    const productsAux = await this.loadImages();
    if(productsAux != undefined){
      for(let i=0; i<productsAux.length; i++){
        this.images.push(productsAux[i]);
        console.log(this.images[i]);
        console.log("aaa");
      }
    }
}
async loadImages(){
  try {
    const data = await this.voucherService.getVoucher().toPromise();
    return data;
  } catch (error) {
    console.error('Error obteniendo datos:', error);
    throw error; // Puedes manejar el error de acuerdo a tus necesidades
  }
}
}
