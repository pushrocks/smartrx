import * as plugins from './smartrx.plugins'

export let standardExport = 'Hi there! :) This is a exported string'
export * from './smartrx.classes.observablemap'
export * from './smartrx.classes.observableintake'

import * as rxjs from 'rxjs'

export {
  rxjs
}
