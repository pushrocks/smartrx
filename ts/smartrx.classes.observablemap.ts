import * as plugins from './smartrx.plugins';

export interface IEventEmitter<T = any> {
  on: (eventNameArg: string, eventHandlerArg: (eventPayload: T) => any) => void;
}

/**
 * bundles an observable with an emitter
 */
export interface IObservableEmitterBundle {
  observable: plugins.rxjs.Observable<any>;
  emitter: IEventEmitter<unknown>;
  event: string;
}

/**
 * manages observables by making sure that only one observable is regsitered per event
 */
export class Observablemap {
  public observableEmitterBundleObjectmap = new plugins.lik.ObjectMap<IObservableEmitterBundle>();

  /**
   * creates a new observable if not yet registered for the same event.
   * In case event has been registered before the same observable is returned.
   */
  public getObservableForEmitterEvent<T>(emitterArg: IEventEmitter<T>, eventArg: string) {
    const existingBundle = this.observableEmitterBundleObjectmap.find(bundleArg => {
      return bundleArg.emitter === emitterArg && bundleArg.event === eventArg;
    });
    if (existingBundle) {
      return existingBundle.observable;
    } else {
      const emitterObservable = plugins.rxjs.fromEvent<T>(emitterArg as any, eventArg);
      this.observableEmitterBundleObjectmap.add({
        observable: emitterObservable,
        emitter: emitterArg,
        event: eventArg
      });
      return emitterObservable;
    }
  }
}
