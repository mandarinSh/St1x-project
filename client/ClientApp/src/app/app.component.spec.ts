import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';


///
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { DialogpageComponent } from './dialogpage/dialogpage.component';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WebconnectionService } from './webconnection.service';
import {RouterModule, Routes} from '@angular/router';
///

describe('AppComponent', () => {
  const routes: Routes = [
    { path: 'loginpage', component: LoginpageComponent },
    { path: 'registerpage', component: RegisterpageComponent },
    { path: 'dialogpage', component: DialogpageComponent },
    { path: '**', redirectTo: 'loginpage' },
    { path: '', redirectTo: 'loginpage', pathMatch: 'full' }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        RegisterpageComponent,
        DialogpageComponent,
        LoginpageComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ClientApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ClientApp');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to ClientApp!');
  // });
});
