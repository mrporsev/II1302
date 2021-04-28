import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-plant-care',
  templateUrl: './plant-care.component.html',
  styleUrls: ['./plant-care.component.scss'],
})
export class PlantCareComponent {
  constructor(private router: Router) {}
}
