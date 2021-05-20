import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISensor, Sensor } from '../sensor.model';
import { SensorService } from '../service/sensor.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import jsonTest from "app/entities/sensor/_files/jsonTest.json";
import {parseArguments} from "@angular/cli/models/parser";

@Component({
  selector: 'jhi-sensor-update',
  templateUrl: './sensor-update.component.html',
})
export class SensorUpdateComponent implements OnInit {
  isSaving = false;
  jsonTestData:{UVScale:string, Temperature:string, SoilMoisture:string, Humidity:string}[] = jsonTest;
  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    humidity: [],
    soilMoisture: [],
    light: [],
    name: [],
    user: [],
  });

  constructor(
    protected sensorService: SensorService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sensor }) => {
      this.updateForm(sensor);
      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sensor = this.createFromForm();
    if (sensor.id !== undefined) {
      this.subscribeToSaveResponse(this.sensorService.update(sensor));
    } else {
      this.subscribeToSaveResponse(this.sensorService.create(sensor));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISensor>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(sensor: ISensor): void {
    this.editForm.patchValue({
      id: sensor.id,
      humidity: sensor.humidity,
      soilMoisture: sensor.soilMoisture,
      light: sensor.light,
      name: sensor.name,
      user: sensor.user,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, sensor.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected randomIntFromInterval(min: number, max: number):number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  protected createFromForm(): ISensor {
    return {
      ...new Sensor(),
      id: this.editForm.get(['id'])!.value,
      //humidity: this.editForm.get(['humidity'])!.value,
      humidity: (Number(this.jsonTestData[3].Humidity) + this.randomIntFromInterval(1,100)).toString(),
      soilMoisture: (Number(this.jsonTestData[2].SoilMoisture) + this.randomIntFromInterval(1,10)).toString(),
      light: (Number(this.jsonTestData[0].UVScale) + this.randomIntFromInterval(1,16)).toString(),
      name: this.editForm.get(['name'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }
}
