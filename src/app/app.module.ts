import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaskDirective } from './mask.directive';
import { MaskCedDirective } from './mask-ced.directive';
import { MaskMontoDirective } from './mask-monto.directive';
import { MaskCorreoDirective } from './mask-correo.directive';

@NgModule({
  declarations: [
    AppComponent,
    MaskDirective,
    MaskCedDirective,
    MaskMontoDirective,
    MaskCorreoDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
