import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';
import { DialogpageComponent } from './dialogpage.component';

///
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';
import { WebconnectionService } from '../webconnection.service';
import { User } from '../user';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
///
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
// import { DialogpageComponent } from '../dialogpage/dialogpage.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {RegisterpageComponent} from "../registerpage/registerpage.component";
// import { WebconnectionService } from '../webconnection.service';
///

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
});
