import { Observable as rxjsObservable } from 'rxjs';
export { rxjsObservable };
export declare class Observable<T> extends rxjsObservable<T> {
    static fromIntake(): void;
}
