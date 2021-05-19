/* eslint-disable no-console */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plantcategory } from 'app/entities/plantcategory/plantcategory.model';
import {
  EntityResponseType,
  EntityArrayResponseType,
  PlantcategoryService,
} from 'app/entities/plantcategory/service/plantcategory.service';
import { Observable } from 'rxjs/internal/Observable';
import { PlantcategoryModule } from 'src/main/webapp/app/entities/plantcategory/plantcategory.module';
import { IPlantcategory } from 'src/main/webapp/app/entities/plantcategory/plantcategory.model';
import { HttpResponse } from '@angular/common/http';

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
  testCategory: Observable<EntityArrayResponseType> | undefined;

  initMsg: string | undefined;

  categories: Plantcategory[] | undefined;

  constructor(private router: Router, private categoryService: PlantcategoryService) {}

  // Initiate component by finding plantcategories from database.
  ngOnInit(): void {
    this.testCategory = this.categoryService.query('select *');
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
    const response = this.categoryService.findByName('Tropical');

    this.responseDB = response;
    return this.responseDB;
  }
}
