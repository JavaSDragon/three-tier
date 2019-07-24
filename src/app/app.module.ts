import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RegComponent } from './reg/reg.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [SearchService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
