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
  //testCategory: Observable<EntityArrayResponseType> | undefined;
  testCategories: Observable<EntityArrayResponseType> | undefined;

  initMsg: string | undefined;

  categories: Plantcategory[] | undefined;

  constructor(private router: Router, private categoryService: PlantcategoryService) {}

  // Initiate component by finding plantcategories from database.
  ngOnInit(): void {
    this.testCategories = this.categoryService.query();
    console.log(this.testCategories);
    this.initMsg = 'onInit har körts!';
  }

  clickEventTest(): string {
    this.msg = 'Information about this plant category should appear here (fetch from database)';
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
