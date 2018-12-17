import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css']
})
export class DialogpageComponent implements OnInit {

  currentInterlocutor = null;

  constructor() { }

  ngOnInit() {
  }

}
