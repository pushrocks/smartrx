import { Observable as rxjsObservable } from 'rxjs'
export {
  rxjsObservable
}

export class Observable<T> extends rxjsObservable<T> {
  static fromIntake () {}
}
