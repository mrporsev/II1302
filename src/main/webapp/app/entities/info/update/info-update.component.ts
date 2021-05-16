import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IInfo, Info } from '../info.model';
import { InfoService } from '../service/info.service';

@Component({
  selector: 'jhi-info-update',
  templateUrl: './info-update.component.html',
})
export class InfoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected infoService: InfoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ info }) => {
      this.updateForm(info);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const info = this.createFromForm();
    if (info.id !== undefined) {
      this.subscribeToSaveResponse(this.infoService.update(info));
    } else {
      this.subscribeToSaveResponse(this.infoService.create(info));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInfo>>): void {
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

  protected updateForm(info: IInfo): void {
    this.editForm.patchValue({
      id: info.id,
    });
  }

  protected createFromForm(): IInfo {
    return {
      ...new Info(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
