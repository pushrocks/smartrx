import { tap, expect } from '@pushrocks/tapbundle';

import * as smartrx from '../ts/index';

tap.test('should create a valid instance of observableinstake', async () => {
  const testObservableIntake = new smartrx.ObservableIntake();
  expect(testObservableIntake).to.be.instanceOf(smartrx.ObservableIntake);
});

tap.test('expect testObserservableIntake to push things', async (tools) => {
  const testObserservableIntake = new smartrx.ObservableIntake();
  testObserservableIntake.subscribe((value) => {
    console.log(value);
  });

  testObserservableIntake.push('hi');
  testObserservableIntake.push('wow');
  testObserservableIntake.signalComplete();
  await testObserservableIntake.completed;
});

tap.test('expect testObserservableIntake to push things', async (tools) => {
  const testObserservableIntake = new smartrx.ObservableIntake();
  testObserservableIntake.push('hi');
  testObserservableIntake.push('wow');
  testObserservableIntake.makeBuffered();
  testObserservableIntake.push('jo');
  testObserservableIntake.subscribe((value) => {
    console.log(value);
    testObserservableIntake.signalComplete();
  });
  testObserservableIntake.request(1);
  await testObserservableIntake.completed;
});

tap.test('', async () => {});

tap.start();
