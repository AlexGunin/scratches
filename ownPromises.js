const fetchWithRetry = (constructor, tries) =>
  constructor().catch((err) =>
    tries <= 0 ? Promise.reject(err) : fetchWithRetry(constructor, tries - 1)
  );

const tryWrapper = (res, rej) => {
  try {
    return res();
  } catch (err) {
    return rej(err);
  }
};

class SyncPromise {
  status = "pending";

  onFulfilled = new Set();

  onRejected = new Set();

  value = undefined;

  reason = undefined;

  constructor(executor) {
    this.executor = executor;

    tryWrapper(() => executor(this.resolve, this.reject), this.reject);
  }

  checkIsStatus = (status) => this.status === status;

  checkIsPending = () => this.checkIsStatus("pending");

  checkIsFulfilled = () => this.checkIsStatus("fulfilled");

  checkIsRejected = () => this.checkIsStatus("rejected");

  checkIsThenable = (value) =>
    value != null && typeof value.then === "function";

  resolve = (value) => {
    if (!this.checkIsPending()) return;

    if (this.checkIsThenable(value))
      return value.then(this.resolve, this.reject);

    this.status = "fulfilled";
    this.value = value;

    this.onFulfilled.forEach((fn) => fn());
  };

  reject = (err) => {
    if (!this.checkIsPending()) return;

    this.status = "rejected";
    this.reason = err;

    this.onRejected.forEach((fn) => fn());

    queueMicrotask(
      () => this.onRejected.size === 0 && Promise.reject(this.reason)
    );
  };

  then = (onFulfilled, onRejected) =>
    new SyncPromise((res, rej) => {
      if (this.checkIsFulfilled()) {
        tryWrapper(
          () => res(onFulfilled ? onFulfilled(this.value) : this.value),
          rej
        );
        return;
      }

      if (this.checkIsRejected()) {
        if (onRejected) {
          tryWrapper(() => res(onRejected(this.reason)), rej);
          return;
        }

        rej(this.reason);
      }

      this.onFulfilled.add(onFulfilled);
      this.onRejected.add(onRejected);
    });
}
//
// const a = new SyncPromise((resolve) => {
//   const b = 10 + 20;
//   resolve(b);
// }).then((value) => console.log(value));
// console.log(2);


const PROMISE_STATUSES = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

class MyPromise {

    status = PROMISE_STATUSES.pending

    value = null

    error = null

    constructor(executor) {
        try {
            executor(this.onResolve, this.onReject)
        } catch(err) {
            this.onReject(err)
        }

        this.executor = executor
        return this
    }

    static resolve = () => {

    }

    then = (res, rej) => {
        if(!this.error) {
        queueMicrotask(() => res(this.value))
        this.status = PROMISE_STATUSES.fulfilled
        }
        return this
    }

    catch = (rej) => {
        if(this.error) {
            queueMicrotask(() => rej(this.error))
            this.status = PROMISE_STATUSES.rejected
        }
        return this
    }

    onResolve = (value) => {
        this.value = value
    }

    onReject = (err) => {
        this.error = err
        this.status = PROMISE_STATUSES.rejected
    }
}


const p1 = new Promise((res, rej) => {
    setTimeout(() => res(44), 1000)
})

p1.then(console.log).catch(console.log)

const p2 = new MyPromise((res, rej) => {
    res(4)
})

p2.then(console.log).catch(console.log)
