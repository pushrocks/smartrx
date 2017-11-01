"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartrx.plugins");
const rxjs_1 = require("rxjs");
/**
 * ObservableIntake
 */
class ObservableIntake {
    constructor() {
        this.observableFunctions = {
            next: (payloadArg) => {
                // nothing
            },
            complete: (payloadArg) => {
                // nothing
            }
        };
        this.generator = null;
        this.buffered = false;
        this.payloadBuffer = [];
        this.observable = rxjs_1.Observable.create((observerArg) => {
            this.observableFunctions.next = (...args) => {
                return observerArg.next(...args);
            };
            this.observableFunctions.complete = (...args) => {
                this.completedDeffered.resolve();
                return observerArg.complete(...args);
            };
        });
        this.completedDeffered = plugins.smartq.defer();
        this.completed = this.completedDeffered.promise;
    }
    setObservable(observableFunc) {
        this.observable = observableFunc();
    }
    push(payloadArg) {
        if (this.buffered) {
            this.payloadBuffer.push(payloadArg);
        }
        else {
            this.internalPush(payloadArg);
        }
    }
    /**
     * pushes many payloads as array
     * @param payloadArgArray
     */
    pushMany(payloadArgArray) {
        for (let item of payloadArgArray) {
            this.push(item);
        }
    }
    /**
     * sets a generator to query the next pushed value
     * @param generatorArg
     */
    setGenerator(generatorArg) {
        this.generator = generatorArg;
    }
    makeBuffered() {
        this.buffered = true;
    }
    subscribe(...args) {
        return this.observable.subscribe(...args);
    }
    /**
     * request the next values in the quantity specified
     * @param howManyArg if a generator is set, of a buffer exists, this allows retrieving values
     */
    request(howManyArg) {
        if (howManyArg === 0) {
            return;
        }
        else {
            for (let i = 0; i !== howManyArg; i++) {
                if (this.payloadBuffer.length > 0) {
                    this.internalPush(this.payloadBuffer.shift());
                }
                else {
                    const nextPayload = this.generator();
                    this.internalPush(nextPayload);
                }
            }
        }
    }
    /**
     * signals the completion of this observable
     */
    signalComplete() {
        this.observableFunctions.complete();
    }
    internalPush(payloadArg) {
        this.observableFunctions.next(payloadArg);
    }
}
exports.ObservableIntake = ObservableIntake;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRyeC5jbGFzc2VzLm9ic2VydmFibGVpbnRha2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHJ4LmNsYXNzZXMub2JzZXJ2YWJsZWludGFrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUM1QywrQkFBK0M7QUFHL0M7O0dBRUc7QUFDSDtJQWdCRTtRQVpRLHdCQUFtQixHQUFRO1lBQ2pDLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUNuQixVQUFVO1lBQ1osQ0FBQztZQUNELFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUN2QixVQUFVO1lBQ1osQ0FBQztTQUNGLENBQUE7UUFDTyxjQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUE7UUFDaEIsa0JBQWEsR0FBRyxFQUFFLENBQUE7UUFHeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUMxQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ2xDLENBQUMsQ0FBQTtZQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2hDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDdEMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUE7SUFDakQsQ0FBQztJQUVELGFBQWEsQ0FBRSxjQUFjO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxFQUFFLENBQUE7SUFDcEMsQ0FBQztJQUVELElBQUksQ0FBRSxVQUFhO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3JDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQUUsZUFBb0I7UUFDNUIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWSxDQUFFLFlBQVk7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUE7SUFDL0IsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtJQUN0QixDQUFDO0lBRUQsU0FBUyxDQUFFLEdBQUcsSUFBSTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTyxDQUFFLFVBQWtCO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQTtRQUNSLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO2dCQUMvQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtvQkFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDaEMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNaLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNyQyxDQUFDO0lBRU8sWUFBWSxDQUFFLFVBQVU7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0Y7QUFqR0QsNENBaUdDIn0=