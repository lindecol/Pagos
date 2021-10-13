import {Component, OnInit} from '@angular/core';

import {environment} from '@env/environment';
import {nombreEmp, nombreProducto, version} from '../../environments/constantes';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  nombreProducto = nombreProducto;
  nombreEmp = nombreEmp;
  version = version;

  constructor() {
  }

  ngOnInit() {
  }
}
