jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPlantcategory, Plantcategory } from '../plantcategory.model';
import { PlantcategoryService } from '../service/plantcategory.service';

import { PlantcategoryRoutingResolveService } from './plantcategory-routing-resolve.service';

describe('Service Tests', () => {
  describe('Plantcategory routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PlantcategoryRoutingResolveService;
    let service: PlantcategoryService;
    let resultPlantcategory: IPlantcategory | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PlantcategoryRoutingResolveService);
      service = TestBed.inject(PlantcategoryService);
      resultPlantcategory = undefined;
    });

    describe('resolve', () => {
      it('should return IPlantcategory returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPlantcategory = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPlantcategory).toEqual({ id: 123 });
      });

      it('should return new IPlantcategory if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPlantcategory = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPlantcategory).toEqual(new Plantcategory());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPlantcategory = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPlantcategory).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
