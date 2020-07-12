import * as plugins from './smartrx.plugins';

/**
 * ObservableIntake
 */
export class ObservableIntake<T> {
  public observable: plugins.rxjs.Observable<T>;
  public completed: Promise<void>;
  private completedDeffered: plugins.smartpromise.Deferred<void>;
  private observableFunctions: any = {
    next: (payloadArg) => {
      // nothing
    },
    complete: (payloadArg) => {
      // nothing
    },
  };
  private generator = null;
  private buffered = false;
  private payloadBuffer = [];

  constructor() {
    this.observable = plugins.rxjs.Observable.create((observerArg) => {
      this.observableFunctions.next = (...args) => {
        return observerArg.next(...args);
      };
      this.observableFunctions.complete = (...args) => {
        this.completedDeffered.resolve();
        return observerArg.complete(...args);
      };
    });
    this.completedDeffered = plugins.smartpromise.defer();
    this.completed = this.completedDeffered.promise;
  }

  public setObservable(observableFunc) {
    this.observable = observableFunc();
  }

  public push(payloadArg: T) {
    if (this.buffered) {
      this.payloadBuffer.push(payloadArg);
    } else {
      this.internalPush(payloadArg);
    }
  }

  /**
   * pushes many payloads as array
   * @param payloadArgArray
   */
  public pushMany(payloadArgArray: T[]) {
    for (const item of payloadArgArray) {
      this.push(item);
    }
  }

  /**
   * sets a generator to query the next pushed value
   * @param generatorArg
   */
  public setGenerator(generatorArg) {
    this.generator = generatorArg;
  }

  public makeBuffered() {
    this.buffered = true;
  }

  public subscribe(...args) {
    return this.observable.subscribe(...args);
  }

  /**
   * request the next values in the quantity specified
   * @param howManyArg if a generator is set, of a buffer exists, this allows retrieving values
   */
  public request(howManyArg: number) {
    if (howManyArg === 0) {
      return;
    } else {
      for (let i = 0; i !== howManyArg; i++) {
        if (this.payloadBuffer.length > 0) {
          this.internalPush(this.payloadBuffer.shift());
        } else {
          const nextPayload = this.generator();
          this.internalPush(nextPayload);
        }
      }
    }
  }

  /**
   * signals the completion of this observable
   */
  public signalComplete() {
    this.observableFunctions.complete();
  }

  private internalPush(payloadArg) {
    this.observableFunctions.next(payloadArg);
  }
}
