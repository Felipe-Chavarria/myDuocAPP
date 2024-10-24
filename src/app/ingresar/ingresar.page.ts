import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  public usuario: string;
  scannedData: any;

  constructor(private qrScanner: QRScanner, private http: HttpClient, private NavCtrl: NavController) {
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
    const apiUrl = 'https://example.com/api'; // Cambia por tu URL real
    const body = { studentId: data };

    this.http.post(apiUrl, body).subscribe(
      (response: any) => {
        console.log('Asistencia registrada exitosamente', response);
      },
      (error: any) => {
        console.error('Error registrando asistencia', error);
      }
    );
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      this.usuario = storedUser;
    } else {
      this.usuario = 'Usuario';
    }
  }
}
