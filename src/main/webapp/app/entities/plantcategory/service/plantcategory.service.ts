import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlantcategory, getPlantcategoryIdentifier } from '../plantcategory.model';

export type EntityResponseType = HttpResponse<IPlantcategory>;
export type EntityArrayResponseType = HttpResponse<IPlantcategory[]>;

@Injectable({ providedIn: 'root' })
export class PlantcategoryService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/plantcategories');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(plantcategory: IPlantcategory): Observable<EntityResponseType> {
    return this.http.post<IPlantcategory>(this.resourceUrl, plantcategory, { observe: 'response' });
  }

  update(plantcategory: IPlantcategory): Observable<EntityResponseType> {
    return this.http.put<IPlantcategory>(`${this.resourceUrl}/${getPlantcategoryIdentifier(plantcategory) as number}`, plantcategory, {
      observe: 'response',
    });
  }

  partialUpdate(plantcategory: IPlantcategory): Observable<EntityResponseType> {
    return this.http.patch<IPlantcategory>(`${this.resourceUrl}/${getPlantcategoryIdentifier(plantcategory) as number}`, plantcategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlantcategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlantcategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPlantcategoryToCollectionIfMissing(
    plantcategoryCollection: IPlantcategory[],
    ...plantcategoriesToCheck: (IPlantcategory | null | undefined)[]
  ): IPlantcategory[] {
    const plantcategories: IPlantcategory[] = plantcategoriesToCheck.filter(isPresent);
    if (plantcategories.length > 0) {
      const plantcategoryCollectionIdentifiers = plantcategoryCollection.map(
        plantcategoryItem => getPlantcategoryIdentifier(plantcategoryItem)!
      );
      const plantcategoriesToAdd = plantcategories.filter(plantcategoryItem => {
        const plantcategoryIdentifier = getPlantcategoryIdentifier(plantcategoryItem);
        if (plantcategoryIdentifier == null || plantcategoryCollectionIdentifiers.includes(plantcategoryIdentifier)) {
          return false;
        }
        plantcategoryCollectionIdentifiers.push(plantcategoryIdentifier);
        return true;
      });
      return [...plantcategoriesToAdd, ...plantcategoryCollection];
    }
    return plantcategoryCollection;
  }
}
