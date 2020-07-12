// this file is intended to keep the bundle size down

export { Observable, Subject, fromEvent, ReplaySubject } from 'rxjs';

import { startWith, takeUntil, map, debounce, debounceTime } from 'rxjs/operators';

export const ops = {
  debounce,
  debounceTime,
  map,
  startWith,
  takeUntil,
};
