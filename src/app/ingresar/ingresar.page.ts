import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Asistencia } from '../models/asistencia';

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
    private router: Router,
    private api : ProveedorCursosService
  ) { }

  ngOnInit() {
    if(this.platform.is('capacitor')){

      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
      this.empezarScan();
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
      console.log('Codigo del evento:', this.resultadoScan);

      this.registrarAsistencia(this.resultadoScan);

      alert('Asistencia registrada para el evento:' + this.resultadoScan);

      this.router.navigate(['/home']);
      } else {
      alert('QR invalido o no corresponde a un evento')
    }
  }

  registrarAsistencia(eventCode: string) {
    console.log('Registrando asistencia para el evento:', eventCode);
    this.api.registrarAsistencia(eventCode).subscribe(
      (response: any) => {
        const datos: Asistencia = {
          mensaje: response.message,
        };
        alert(datos.mensaje);
      }
    );
  }

}
