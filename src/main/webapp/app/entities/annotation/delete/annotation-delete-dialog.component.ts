import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnnotation } from '../annotation.model';
import { AnnotationService } from '../service/annotation.service';

@Component({
  templateUrl: './annotation-delete-dialog.component.html',
})
export class AnnotationDeleteDialogComponent {
  annotation?: IAnnotation;

  constructor(protected annotationService: AnnotationService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.annotationService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
