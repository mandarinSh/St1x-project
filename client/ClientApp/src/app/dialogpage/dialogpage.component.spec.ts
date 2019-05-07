import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';
import { DialogpageComponent } from './dialogpage.component';

import { WebconnectionService } from '../webconnection.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {RegisterpageComponent} from '../registerpage/registerpage.component';


describe('DialogpageComponent', () => {
  let component: DialogpageComponent;
  let fixture: ComponentFixture<DialogpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RegisterpageComponent,
        DialogpageComponent,
        LoginpageComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule
      ],
      providers: [ WebconnectionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init dialogs', () => {
    component.ngOnInit();
    expect(component.dialogs).toBe(component.dialogs);
  });

  it('finds user', () => {
    component.findUser();
    expect(component.isInDialog).toBe(true);
  });

  // it('closes dialog', () => {
  //   component.closeDialog();
  //   expect(component.isInDialog).toBe(false);
  //   expect(component.currentDialogueId).toBe(null);
  //   expect(component.currentReceiverId).toBe(null);
  //   expect(component.currentReceiverNickname).toBe('');
  //   // expect(component.messages).toBe([]);
  // });

  // it('destroys dialogs', () => {
  //   component.ngOnDestroy();
  //   // expect(component.messages).toBe([]);
  //   // expect(component.dialogs).toBe([]);
  // });
});
