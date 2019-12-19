import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    public showSpinnerSubject: BehaviorSubject<number>;
    constructor() {
        this.showSpinnerSubject = new BehaviorSubject<number>(0);
    }
}
