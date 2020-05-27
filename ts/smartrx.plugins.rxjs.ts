// this file is intended to keep the bundle size down

export {
  Observable,
  Subject,
  fromEvent
} from 'rxjs';

import { startWith, takeUntil, map } from 'rxjs/operators';

export const ops = {
  startWith,
  takeUntil,
  map
};
