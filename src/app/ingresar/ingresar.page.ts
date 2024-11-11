import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  resultadoScan ='';

  constructor(
    private modalControler: ModalController,
    private platform: Platform,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    if(this.platform.is('capacitor')){

      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
  }
}

  async empezarScan() {
    const modal = await this.modalControler.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back 
    }
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();

    if(data){
      this.resultadoScan = data?.barcode?.displayValue;
    }
  }

}
