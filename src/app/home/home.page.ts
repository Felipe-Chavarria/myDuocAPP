import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: any;
  public perfil: any;
  public currentTheme: 'light' | 'dark' = 'light';
  public resultadoScan: any;

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private api: ProveedorCursosService,
    private platform: Platform,
    private modalController: ModalController
  ) {
    this.usuario = '';
    this.perfil = '';
  }

  async ngOnInit() {
    this.usuario = await this.auth.getNombre();
    this.perfil = await this.auth.getPerfil();
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    } else {
      alert('Escaneo de código de barras no soportado en este dispositivo');
    }
  }

  async presentConfirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          },
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            await this.auth.logout();
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  async cerrarSesion() {
    await this.presentConfirmLogout();
  }
  //dark mode
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('color-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  async empezarScan() {
    const previousTheme = document.body.getAttribute('color-theme');
    document.body.removeAttribute('color-theme');

    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensFacing: LensFacing.Back,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (previousTheme) {
      document.body.setAttribute('color-theme', previousTheme);
    }
    

    if (data) {
      this.resultadoScan = data?.barcode?.displayValue;
      console.log('Código del evento:', this.resultadoScan);

      this.registrarAsistencia(this.resultadoScan);

      this.router.navigate(['/home']);
    } else {
      alert('QR inválido o no corresponde a un evento');
    }
  }

  async registrarAsistencia(eventCode: string) {
    console.log('Registrando asistencia para el evento:', eventCode);
    this.api.registrarAsistencia(eventCode).subscribe(
      (response: any) => {
        const datos: any = {
          mensaje: response.message,
        };
        alert(datos.mensaje);
      },
      (error) => {
        console.error('Error al registrar la asistencia', error);
        alert('Hubo un error al registrar la asistencia');
      }
    );
  }
}
