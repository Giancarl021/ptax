import PTAXLoader from './lib';

const loader = PTAXLoader();

const now = new Date();

Async(loader.getFromDate(now));
Async(loader.getFromDateRetroactively(now));

function Async<T>(promise: Promise<T>) {
    promise.then(console.log).catch(console.error);
}
