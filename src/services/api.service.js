import { Subject } from 'rxjs';
import { fromPromise } from  'rxjs/internal/observable/fromPromise';
import { mergeMap } from 'rxjs/operators';

const subject = new Subject();

export const setUserInfo = {
    sendUserInfo: data => subject.next( console.log(data)),
    getUserInfo: () => subject.asObservable()
};

export const apiService = {
    requestData: (userName) => {
        fromPromise(fetch(`https://api.github.com/users/${userName}/repos`))
        .pipe(
            mergeMap((response) => response.json())
        )
        .subscribe(
            (data) => subject.next( data)
        );
    },
    getData: () => subject.asObservable()
};
