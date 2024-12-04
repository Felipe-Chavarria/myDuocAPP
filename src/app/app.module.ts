import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ProveedorCursosService } from './providers/proveedor-cursos.service';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './providers/auth.service';
import { AuthInterceptor } from './interceptores/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { QrCodeModule } from 'ng-qrcode';
import { AsistenciaModalComponent } from './ver-clases/AsistenciaModal.component';


@NgModule({
  declarations: [AppComponent, AsistenciaModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    ReactiveFormsModule,
  FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ProveedorCursosService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
