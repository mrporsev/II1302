import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-plant-care',
  templateUrl: './plant-care.component.html',
  styleUrls: ['./plant-care.component.scss'],
})
export class PlantCareComponent {
  //msg : string | undefined;
  msg = '';
  constructor(private router: Router) {}

  clickEventTest(): string {
    this.msg = 'Information about this plant category should appear here (fetch from database)';
    return this.msg;
  }
}
