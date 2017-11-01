import { Observable, Subscription } from 'rxjs';
/**
 * ObservableIntake
 */
export declare class ObservableIntake<T> {
    observable: Observable<T>;
    completed: Promise<void>;
    private completedDeffered;
    private observableFunctions;
    private generator;
    private buffered;
    private payloadBuffer;
    constructor();
    setObservable(observableFunc: any): void;
    push(payloadArg: T): void;
    /**
     * pushes many payloads as array
     * @param payloadArgArray
     */
    pushMany(payloadArgArray: T[]): void;
    /**
     * sets a generator to query the next pushed value
     * @param generatorArg
     */
    setGenerator(generatorArg: any): void;
    makeBuffered(): void;
    subscribe(...args: any[]): Subscription;
    /**
     * request the next values in the quantity specified
     * @param howManyArg if a generator is set, of a buffer exists, this allows retrieving values
     */
    request(howManyArg: number): void;
    /**
     * signals the completion of this observable
     */
    signalComplete(): void;
    private internalPush(payloadArg);
}
