import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './components/panel/panel.component';
import { CardComponent } from './components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {NoteService} from './services/note.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import {ColorService} from './services/color.service';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    CardComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule
  ],
  providers: [
    NoteService,
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
