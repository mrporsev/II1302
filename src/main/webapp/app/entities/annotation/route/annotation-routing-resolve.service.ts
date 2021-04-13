import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnnotation, Annotation } from '../annotation.model';
import { AnnotationService } from '../service/annotation.service';

@Injectable({ providedIn: 'root' })
export class AnnotationRoutingResolveService implements Resolve<IAnnotation> {
  constructor(protected service: AnnotationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnnotation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((annotation: HttpResponse<Annotation>) => {
          if (annotation.body) {
            return of(annotation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Annotation());
  }
}
