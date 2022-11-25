import { ModalType } from './error-and-confirmation-modal.component';
import { Observable } from 'rxjs';

export interface ErrorAndConfirmDataModel {
  message: string;
  description: string;
  modalType: ModalType;
  listArray?: any[];
  confirmButtonText?: string;
  onConfirm?(data?: any): Observable<any>;
  onError?(data?: any): any;
}
