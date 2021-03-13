import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/shared/ComponentCanDeactivate/ComponentCanDeactivate';

@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor() {
  }

  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> {
    if (!!component.canDeactivate()) {
	// component can be deactivated 
      return of(true);
    }
 // component can't be deactivated trigger confirm dialog
  }

}