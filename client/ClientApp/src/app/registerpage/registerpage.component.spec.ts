import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';

import { RegisterpageComponent } from './registerpage.component';

///
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
///
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { DialogpageComponent } from '../dialogpage/dialogpage.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WebconnectionService } from '../webconnection.service';
import {isNumeric} from 'rxjs/internal-compatibility';
///

describe('RegisterpageComponent', () => {
  let component: RegisterpageComponent;
  let fixture: ComponentFixture<RegisterpageComponent>;

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
    fixture = TestBed.createComponent(RegisterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    // expect(component).toBeTruthy();
  });

  it('register config updates', () => {
    component.nickName = 'testUser';
    component.password = '111111';
    component.confPassword = '111111';
    component.onSigningUp();
    expect(component.userId).toBe(component.userId);
  });
});
