/**
 * A class which extends `Error`, requiring args to be passed with the constructor
 *
 * @class ArgumentsNotFulfilled
 */
export default class ArgumentsNotFulfilled extends Error {
  /**
   * Creates an instance of ArgumentsNotFulfilled.
   *
   * @param {...any[]} args use `...arguments` or manually specify arguments
   */
  constructor(...args: any[]) {
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

    super(message);

    let stack = this.stack;
    let methodName = stack.split("Function.")[1];
    let errorLocation = methodName.substring(methodName.indexOf(":") + 1, methodName.indexOf(")"));

    methodName = methodName.substring(0, methodName.indexOf("(")).trim();

    message += `(${methodName.yellow}:${errorLocation.red}) ${"!!".red}`;
    message.print(true);
  }
}
