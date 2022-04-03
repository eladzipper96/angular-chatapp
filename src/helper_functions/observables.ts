import { Observable } from "rxjs";

export const observableExtractor = (obs : Observable<any>) => {
    let value;
    obs.subscribe(val => value = val).unsubscribe()
    return value
}