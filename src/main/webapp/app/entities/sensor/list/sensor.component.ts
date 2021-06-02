import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISensor } from '../sensor.model';
import { SensorService } from '../service/sensor.service';
import { SensorDeleteDialogComponent } from '../delete/sensor-delete-dialog.component';

import jsonTest from '../_files/jsonTest.json';

@Component({
  selector: 'jhi-sensor',
  templateUrl: './sensor.component.html',
})
export class SensorComponent implements OnInit {
  sensors?: ISensor[];                             //array storing collection of sensors for current user
  isLoading = false;
  jsonTestData: { UVScale: string; Temperature: string; SoilMoisture: string; Humidity: string }[] = jsonTest;

  constructor(protected sensorService: SensorService, protected modalService: NgbModal, private httpClient: HttpClient) {}

  loadAll(): void {
    this.isLoading = true;

    this.sensorService.query().subscribe(
      (res: HttpResponse<ISensor[]>) => {
        this.isLoading = false;
        this.sensors = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
    //this.callApi();
    // console.log(this.jsonTestData[2].SoilMoisture);
    // console.log(this.jsonTestData);
  }

  /*
  callApi():void {
    const apiUrl = "https://3d3nq3.internetofthings.ibmcloud.com/api/v0002/device/types/Sensor/devices/Sensor_2/events"
    this.httpClient.get<any>(apiUrl, { headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Request-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization',
        'Content-Type':  'application/json',
        Authorization: 'Basic a-3d3nq3-sev80kcf2a : ts7GmvrSt6UI+aXN1h'
      })}).subscribe(
      response => {
        console.log(response);
        this.sensors = response;
      }
    );
  }


  callApi():void {
    const apiUrl = "http://www.whateverorigin.org/get?url=https://3d3nq3.internetofthings.ibmcloud.com/api/v0002/device/types/Sensor/devices/Sensor_2/events"
    this.httpClient.get<any>(apiUrl, { headers: new HttpHeaders({
        Authorization: 'a-3d3nq3-sev80kcf2a : ts7GmvrSt6UI+aXN1h'
      })}).subscribe(
      response => {
        console.log(response);
        this.sensors = response;
      }
    );
  }
*/
  trackId(index: number, item: ISensor): number {
    return item.id!;
  }

  delete(sensor: ISensor): void {
    const modalRef = this.modalService.open(SensorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sensor = sensor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
