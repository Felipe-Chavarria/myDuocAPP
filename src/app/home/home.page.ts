import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  
  public usuario: string ;
  scannedData: any;

  constructor(private qrScanner: QRScanner, private http: any,private NavCtrl: NavController) {
    this.usuario = '';
  }
  scanQRCode() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          this.scannedData = text;
          console.log('Scanned something', text);

          // Desactivar escáner una vez escaneado el código
          this.qrScanner.hide(); // Oculta la vista de la cámara
          scanSub.unsubscribe(); // Finaliza la subscripción del escáner
        });

        this.qrScanner.show();
      } else if (status.denied) {
        // Permisos denegados permanentemente
        console.log('Camera permission denied');
      } else {
        // Permisos denegados temporalmente
        console.log('Permission was denied temporarily');
      }
    });
  }
  sendDataToApi(data: string) {
    const apiUrl = 'https://';
    const body = { studentId: data };
    

    this.http.post(apiUrl, body).subscribe(
      (response:any) => {
        console.log('Asistencia registrada exitosamente', response);
      },
      (error:any) => {
        console.error('Error registrando asistencia', error);
      }
    );
  }

  ngOnInit() {
    const storedUser =  localStorage.getItem('usuario');
    if(storedUser){
      this.usuario = storedUser;
    }else{
      this.usuario = 'Usuario';
    }
  }
}
