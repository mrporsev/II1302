/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plantcategory } from 'app/entities/plantcategory/plantcategory.model';
import {
  EntityResponseType,
  EntityArrayResponseType,
  PlantcategoryService,
} from 'app/entities/plantcategory/service/plantcategory.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'jhi-plant-care',
  templateUrl: './plant-care.component.html',
  styleUrls: ['./plant-care.component.scss'],
})
export class PlantCareComponent implements OnInit {
  msg: string | undefined;
  secondmsg: string | undefined;
  responseDB: Observable<EntityResponseType> | undefined;
  // testCategories: Observable<EntityArrayResponseType> | undefined;
  testCategories: Array<Plantcategory> | undefined;

  initMsg: string | undefined;

  categories: Plantcategory[] | undefined;

  constructor(private categoryService: PlantcategoryService) {}

  // Initiate component by finding plantcategories from database.
  ngOnInit(): void {
    this.testCategories = this.categoryService.getAllHardcoded();
    console.log(this.testCategories);
    this.initMsg = 'onInit har körts!';
  }

  clickEventTest(): string {
    this.msg = 'hämtar info från plant-care';
    return this.msg;
  }
  clickEventTestCategory(): string {
    this.secondmsg = this.categoryService.findTest();
    return this.secondmsg;
  }

  // parse into PlantCategory class from PlantCategoryModel?
  clickEventFetchFromDB(): Observable<EntityResponseType> {
    const response = this.categoryService.find(1);
    console.log(response);
    this.responseDB = response;
    return this.responseDB;
  }
}
