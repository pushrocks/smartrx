import { tap, expect } from 'tapbundle'

import * as smartrx from '../ts/index'

tap.test('should create a valid instance of observableinstake', async () => {
  const testObservableIntake = new smartrx.ObservableIntake()
  expect(testObservableIntake).to.be.instanceOf(smartrx.ObservableIntake)
})

tap.test('expect testObserservableIntake to be lazy', async (tools) => {
  const testObserservableIntake = new smartrx.ObservableIntake()
  testObserservableIntake.subscribe(value => {
    console.log(value)
  })

  testObserservableIntake.push('hi')
  testObserservableIntake.signalComplete()
  await testObserservableIntake.completed
})

tap.start()
