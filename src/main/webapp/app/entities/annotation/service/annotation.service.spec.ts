import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAnnotation, Annotation } from '../annotation.model';

import { AnnotationService } from './annotation.service';

describe('Service Tests', () => {
  describe('Annotation Service', () => {
    let service: AnnotationService;
    let httpMock: HttpTestingController;
    let elemDefault: IAnnotation;
    let expectedResult: IAnnotation | IAnnotation[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AnnotationService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        smiley: 'AAAAAAA',
        textBox: 'AAAAAAA',
        date: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Annotation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.create(new Annotation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Annotation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            smiley: 'BBBBBB',
            textBox: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Annotation', () => {
        const patchObject = Object.assign(
          {
            textBox: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          new Annotation()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Annotation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            smiley: 'BBBBBB',
            textBox: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Annotation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAnnotationToCollectionIfMissing', () => {
        it('should add a Annotation to an empty array', () => {
          const annotation: IAnnotation = { id: 123 };
          expectedResult = service.addAnnotationToCollectionIfMissing([], annotation);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(annotation);
        });

        it('should not add a Annotation to an array that contains it', () => {
          const annotation: IAnnotation = { id: 123 };
          const annotationCollection: IAnnotation[] = [
            {
              ...annotation,
            },
            { id: 456 },
          ];
          expectedResult = service.addAnnotationToCollectionIfMissing(annotationCollection, annotation);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Annotation to an array that doesn't contain it", () => {
          const annotation: IAnnotation = { id: 123 };
          const annotationCollection: IAnnotation[] = [{ id: 456 }];
          expectedResult = service.addAnnotationToCollectionIfMissing(annotationCollection, annotation);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(annotation);
        });

        it('should add only unique Annotation to an array', () => {
          const annotationArray: IAnnotation[] = [{ id: 123 }, { id: 456 }, { id: 39328 }];
          const annotationCollection: IAnnotation[] = [{ id: 123 }];
          expectedResult = service.addAnnotationToCollectionIfMissing(annotationCollection, ...annotationArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const annotation: IAnnotation = { id: 123 };
          const annotation2: IAnnotation = { id: 456 };
          expectedResult = service.addAnnotationToCollectionIfMissing([], annotation, annotation2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(annotation);
          expect(expectedResult).toContain(annotation2);
        });

        it('should accept null and undefined values', () => {
          const annotation: IAnnotation = { id: 123 };
          expectedResult = service.addAnnotationToCollectionIfMissing([], null, annotation, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(annotation);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
