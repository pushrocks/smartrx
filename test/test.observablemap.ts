// import test framework
import { expect, tap } from '@pushrocks/tapbundle';
import * as events from 'events';
import * as rx from 'rxjs';
import * as smartpromise from '@pushrocks/smartpromise';

// import the module
import * as smartrx from '../ts/index';

let testObservablemap: smartrx.Observablemap;
let testObservable1: rx.Observable<any>;
let testObservable2: rx.Observable<any>;
let testObservable3: rx.Observable<any>;
let testEmitter: events.EventEmitter;

tap.test('should create an instance', async () => {
  testObservablemap = new smartrx.Observablemap();
  expect(testObservablemap).be.instanceof(smartrx.Observablemap);
});

tap.test('should accept a new emitter', async () => {
  let done = smartpromise.defer();
  testEmitter = new events.EventEmitter();
  testObservable1 = testObservablemap.getObservableForEmitterEvent(testEmitter, 'event1');
  testObservable1.subscribe((x) => {
    done.resolve();
  });
  testObservable2 = testObservablemap.getObservableForEmitterEvent(testEmitter, 'event1');
  testObservable3 = testObservablemap.getObservableForEmitterEvent(testEmitter, 'event2');
  expect(testObservable1 === testObservable2).to.be.true;
  expect(testObservable1 === testObservable3).to.be.false;
  testEmitter.emit('event1');
  await done.promise;
});

tap.start();
