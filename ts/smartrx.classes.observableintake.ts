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
  private generator = null
  private buffered = false
  private payloadBuffer = []

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
    if (this.buffered) {
      this.payloadBuffer.push(payloadArg)
    } else {
      this.internalPush(payloadArg)
    }
  }

  /**
   * pushes many payloads as array
   * @param payloadArgArray
   */
  pushMany (payloadArgArray: T[]) {
    for (let item of payloadArgArray) {
      this.push(item)
    }
  }

  /**
   * sets a generator to query the next pushed value
   * @param generatorArg
   */
  setGenerator (generatorArg) {
    this.generator = generatorArg
  }

  makeBuffered() {
    this.buffered = true
  }

  subscribe (...args) {
    return this.observable.subscribe(...args)
  }

  /**
   * request the next values in the quantity specified
   * @param howManyArg if a generator is set, of a buffer exists, this allows retrieving values
   */
  request (howManyArg: number) {
    if (howManyArg === 0) {
      return
    } else {
      for (let i = 0; i !== howManyArg; i++) {
        if (this.payloadBuffer.length > 0) {
          this.internalPush(this.payloadBuffer.shift())
        } else {
          const nextPayload = this.generator()
          this.internalPush(nextPayload)
        }
      }
    }
  }

  /**
   * signals the completion of this observable
   */
  signalComplete () {
    this.observableFunctions.complete()
  }

  private internalPush (payloadArg) {
    this.observableFunctions.next(payloadArg)
  }
}
