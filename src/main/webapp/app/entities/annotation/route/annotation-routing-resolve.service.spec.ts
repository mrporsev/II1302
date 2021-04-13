jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAnnotation, Annotation } from '../annotation.model';
import { AnnotationService } from '../service/annotation.service';

import { AnnotationRoutingResolveService } from './annotation-routing-resolve.service';

describe('Service Tests', () => {
  describe('Annotation routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AnnotationRoutingResolveService;
    let service: AnnotationService;
    let resultAnnotation: IAnnotation | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AnnotationRoutingResolveService);
      service = TestBed.inject(AnnotationService);
      resultAnnotation = undefined;
    });

    describe('resolve', () => {
      it('should return IAnnotation returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAnnotation = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAnnotation).toEqual({ id: 123 });
      });

      it('should return new IAnnotation if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAnnotation = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAnnotation).toEqual(new Annotation());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAnnotation = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAnnotation).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
