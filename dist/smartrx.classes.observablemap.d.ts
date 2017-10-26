/// <reference types="node" />
import * as plugins from './smartrx.plugins';
import { rxjsObservable } from './smartrx.classes.observable';
import { Objectmap } from 'lik';
/**
 * bundles an observable with an emitter
 */
export interface ObservableEmitterBundle {
    observable: plugins.rxjs.Observable<any>;
    emitter: plugins.events.EventEmitter;
    event: string;
}
/**
 * manages observables by making sure that only one observable is regsitered per event
 */
export declare class Observablemap {
    ObservableEmitterBundleObjectmap: Objectmap<ObservableEmitterBundle>;
    /**
     * creates a new observable if not yet registered for the same event.
     * In case event has been registered before the same observable is returned.
     */
    getObservableForEmitterEvent(emitterArg: plugins.events.EventEmitter, eventArg: string): rxjsObservable<any>;
}
