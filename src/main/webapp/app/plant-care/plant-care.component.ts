import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // det här lade jag till

@Component({
  selector: 'jhi-plant-care',
  templateUrl: './plant-care.component.html',
  styleUrls: ['./plant-care.component.scss'],
})

//export class PlantCareComponent{}
export class PlantCareComponent /*implements OnInit*/ {
  constructor(private router: Router) {}

  /*ngOnInit(): void {
  }*/
}
