# class Observablemap

Event Emitters are nice. However often times you end up with registering multiple listeners for the exact same thing.
Observables have a smaller footprint and a more manageable subscribe logic.
Observablemap registers only one rxjs observable per event and then continues to reference
the same observable that you can subscribe to.

For further information read the linked docs at the top of this README.
