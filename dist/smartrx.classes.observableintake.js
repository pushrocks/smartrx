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
        this.observableFunctions.next(payloadArg);
    }
    subscribe(...args) {
        return this.observable.subscribe(...args);
    }
    signalComplete() {
        this.observableFunctions.complete();
    }
}
exports.ObservableIntake = ObservableIntake;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRyeC5jbGFzc2VzLm9ic2VydmFibGVpbnRha2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHJ4LmNsYXNzZXMub2JzZXJ2YWJsZWludGFrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUM1QywrQkFBK0M7QUFHL0M7O0dBRUc7QUFDSDtJQWFFO1FBVFEsd0JBQW1CLEdBQVE7WUFDakMsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ25CLFVBQVU7WUFDWixDQUFDO1lBQ0QsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ3ZCLFVBQVU7WUFDWixDQUFDO1NBQ0YsQ0FBQTtRQUdDLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUNsQyxDQUFDLENBQUE7WUFDRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUNoQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ3RDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFBO0lBQ2pELENBQUM7SUFFRCxhQUFhLENBQUUsY0FBYztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsRUFBRSxDQUFBO0lBQ3BDLENBQUM7SUFFRCxJQUFJLENBQUUsVUFBYTtRQUNqQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxTQUFTLENBQUUsR0FBRyxJQUFJO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ3JDLENBQUM7Q0FDRjtBQTFDRCw0Q0EwQ0MifQ==