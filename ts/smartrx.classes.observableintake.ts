import * as plugins from './smartrx.plugins'
import { Observable, Subscription } from 'rxjs'
import { Deferred } from 'smartq'

/**
 * ObservableIntake
 */
export class ObservableIntake<T> {
  observable: Observable<T>
  completed: Promise<void>
  private completedDeffered: Deferred<void>
  private observableFunctions: any = {
    next: (payloadArg) => {
      // nothing
    },
    complete: (payloadArg) => {
      // nothing
    }
  }

  constructor () {
    this.observable = Observable.create((observerArg) => {
      this.observableFunctions.next = (...args) => {
        return observerArg.next(...args)
      }
      this.observableFunctions.complete = (...args) => {
        this.completedDeffered.resolve()
        return observerArg.complete(...args)
      }
    })
    this.completedDeffered = plugins.smartq.defer()
    this.completed = this.completedDeffered.promise
  }

  setObservable (observableFunc) {
    this.observable = observableFunc()
  }

  push (payloadArg: T) {
    this.observableFunctions.next(payloadArg)
  }

  subscribe (...args) {
    return this.observable.subscribe(...args)
  }

  signalComplete () {
    this.observableFunctions.complete()
  }
}
