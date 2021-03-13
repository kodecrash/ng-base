import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ConfirmDeactivateService {
  confirmed$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  askForConfirmation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}