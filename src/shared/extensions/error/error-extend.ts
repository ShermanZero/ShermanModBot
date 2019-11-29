/**
 * Creates a new error symbolizing that the arguments were not fulfilled, when creating, use `...arguments` as the constructor property
 *
 * @class ArgumentsNotFulfillled
 */
class ArgumentsNotFulfilled extends Error {
  /**
   *Creates an instance of ArgumentsNotFulfillled.
   * @param {...string[]} args the arguments to pass in, recommended usage of `...arguments`
   */
  constructor(...args: string[]) {
    super("ArgumentsNotFulfilled");

    let message = "!! ".red;
    let argsNotProvidedCount = 0;

    let argumentCheck = "[";

    for (let i = 0; i < args.length; i++) {
      let arg = args[i];

      if (!arg) argsNotProvidedCount++;

      argumentCheck += `${arg ? "PASS" : "FAIL"} | `;
    }

    argumentCheck = (argumentCheck.slice(0, argumentCheck.length - 3) + "]").padEnd(35, ".");
    argumentCheck = argumentCheck.replace(/(PASS)/g, "PASS".green);
    argumentCheck = argumentCheck.replace(/(FAIL)/g, "FAIL".red);
    message += `${argumentCheck} [${argsNotProvidedCount.toString().red}] argument(s) were not provided `;

    let methodName = Error.prototype.stack.split("Function.")[1];
    let errorLocation = methodName.substring(methodName.indexOf(":") + 1, methodName.indexOf(")"));

    methodName = methodName.substring(0, methodName.indexOf("(")).trim();

    message += `(${methodName.yellow}:${errorLocation.red}) ${"!!".red}`;
    message.print(true);
  }
}
