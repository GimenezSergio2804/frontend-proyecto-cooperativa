import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planes-main',
  templateUrl: './planes-main.component.html',
  styleUrls: ['./planes-main.component.css'],
})
export class PlanesMainComponent implements OnInit {
  load_data: any = {};
  planes: any = {};

  constructor() {}

  ngOnInit(): void {}
}
