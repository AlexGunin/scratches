export const classDecorator = <T>(target: T) => {
  return function(...args: any[]) {
    console.log("Constructor called");
    // @ts-ignore
    return new target(...args);
  };
}

@classDecorator
class Test {

}