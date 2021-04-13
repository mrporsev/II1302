import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnnotation } from '../annotation.model';
import { AnnotationService } from '../service/annotation.service';
import { AnnotationDeleteDialogComponent } from '../delete/annotation-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-annotation',
  templateUrl: './annotation.component.html',
})
export class AnnotationComponent implements OnInit {
  annotations?: IAnnotation[];
  isLoading = false;

  constructor(protected annotationService: AnnotationService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.annotationService.query().subscribe(
      (res: HttpResponse<IAnnotation[]>) => {
        this.isLoading = false;
        this.annotations = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAnnotation): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(annotation: IAnnotation): void {
    const modalRef = this.modalService.open(AnnotationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.annotation = annotation;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
