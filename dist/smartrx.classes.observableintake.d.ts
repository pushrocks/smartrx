import { Observable, Subscription } from 'rxjs';
/**
 * ObservableIntake
 */
export declare class ObservableIntake<T> {
    observable: Observable<T>;
    completed: Promise<void>;
    private completedDeffered;
    private observableFunctions;
    constructor();
    setObservable(observableFunc: any): void;
    push(payloadArg: T): void;
    subscribe(...args: any[]): Subscription;
    signalComplete(): void;
}
