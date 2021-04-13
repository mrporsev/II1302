import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnnotation, getAnnotationIdentifier } from '../annotation.model';

export type EntityResponseType = HttpResponse<IAnnotation>;
export type EntityArrayResponseType = HttpResponse<IAnnotation[]>;

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/annotations');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(annotation: IAnnotation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(annotation);
    return this.http
      .post<IAnnotation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(annotation: IAnnotation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(annotation);
    return this.http
      .put<IAnnotation>(`${this.resourceUrl}/${getAnnotationIdentifier(annotation) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(annotation: IAnnotation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(annotation);
    return this.http
      .patch<IAnnotation>(`${this.resourceUrl}/${getAnnotationIdentifier(annotation) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAnnotation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAnnotation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAnnotationToCollectionIfMissing(
    annotationCollection: IAnnotation[],
    ...annotationsToCheck: (IAnnotation | null | undefined)[]
  ): IAnnotation[] {
    const annotations: IAnnotation[] = annotationsToCheck.filter(isPresent);
    if (annotations.length > 0) {
      const annotationCollectionIdentifiers = annotationCollection.map(annotationItem => getAnnotationIdentifier(annotationItem)!);
      const annotationsToAdd = annotations.filter(annotationItem => {
        const annotationIdentifier = getAnnotationIdentifier(annotationItem);
        if (annotationIdentifier == null || annotationCollectionIdentifiers.includes(annotationIdentifier)) {
          return false;
        }
        annotationCollectionIdentifiers.push(annotationIdentifier);
        return true;
      });
      return [...annotationsToAdd, ...annotationCollection];
    }
    return annotationCollection;
  }

  protected convertDateFromClient(annotation: IAnnotation): IAnnotation {
    return Object.assign({}, annotation, {
      date: annotation.date?.isValid() ? annotation.date.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? dayjs(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((annotation: IAnnotation) => {
        annotation.date = annotation.date ? dayjs(annotation.date) : undefined;
      });
    }
    return res;
  }
}
