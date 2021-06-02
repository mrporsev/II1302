import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlantcategory, Plantcategory } from '../plantcategory.model';
import { PlantcategoryService } from '../service/plantcategory.service';

@Injectable({ providedIn: 'root' })
export class PlantcategoryRoutingResolveService implements Resolve<IPlantcategory> {
  constructor(protected service: PlantcategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlantcategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((plantcategory: HttpResponse<Plantcategory>) => {
          if (plantcategory.body) {
            return of(plantcategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Plantcategory());
  }
}
