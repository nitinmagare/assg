import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordComponent } from './record/record.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
