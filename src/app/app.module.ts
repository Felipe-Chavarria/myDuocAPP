import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ProveedorCursosService } from './providers/proveedor-cursos.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [QRScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ProveedorCursosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
