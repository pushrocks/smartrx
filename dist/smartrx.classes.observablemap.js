"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartrx.plugins");
const lik_1 = require("lik");
/**
 * manages observables by making sure that only one observable is regsitered per event
 */
class Observablemap {
    constructor() {
        this.ObservableEmitterBundleObjectmap = new lik_1.Objectmap();
    }
    /**
     * creates a new observable if not yet registered for the same event.
     * In case event has been registered before the same observable is returned.
     */
    getObservableForEmitterEvent(emitterArg, eventArg) {
        let existingBundle = this.ObservableEmitterBundleObjectmap.find((bundleArg) => {
            return (bundleArg.emitter === emitterArg && bundleArg.event === eventArg);
        });
        if (existingBundle) {
            return existingBundle.observable;
        }
        else {
            let emitterObservable = plugins.rxjs.Observable.fromEvent(emitterArg, eventArg);
            this.ObservableEmitterBundleObjectmap.add({
                observable: emitterObservable,
                emitter: emitterArg,
                event: eventArg
            });
            return emitterObservable;
        }
    }
}
exports.Observablemap = Observablemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRyeC5jbGFzc2VzLm9ic2VydmFibGVtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHJ4LmNsYXNzZXMub2JzZXJ2YWJsZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUU1Qyw2QkFBK0I7QUFZL0I7O0dBRUc7QUFDSDtJQUFBO1FBQ0UscUNBQWdDLEdBQUcsSUFBSSxlQUFTLEVBQTJCLENBQUE7SUFzQjdFLENBQUM7SUFwQkM7OztPQUdHO0lBQ0gsNEJBQTRCLENBQUUsVUFBdUMsRUFBRSxRQUFnQjtRQUNyRixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDNUUsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxVQUFVLElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQTtRQUMzRSxDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUE7UUFDbEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQy9FLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hDLFVBQVUsRUFBRSxpQkFBaUI7Z0JBQzdCLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixLQUFLLEVBQUUsUUFBUTthQUNoQixDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsaUJBQWlCLENBQUE7UUFDMUIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXZCRCxzQ0F1QkMifQ==