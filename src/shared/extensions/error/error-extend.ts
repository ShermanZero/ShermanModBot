/**
 * Creates a new error symbolizing that the arguments were not fulfilled, when creating, use `...arguments` as the constructor property
 *
 * @class ArgumentsNotFulfillled
 */
export class ArgumentsNotFulfilled extends Error {
  /**
   *Creates an instance of ArgumentsNotFulfillled.
   * @param {...string[]} args the arguments to pass in, recommended usage of `...arguments`
   */
  constructor(...args: any[]) {
    super("ArgumentsNotFulfilled");

    let message = "!! ".red;
    let argsNotProvidedCount = 0;

    let argumentCheck = "[";

    for (let i = 0; i < args.length; i++) {
      let arg = args[i];

      if (!arg) argsNotProvidedCount++;

      argumentCheck += `${arg ? "PASS" : "FAIL"} | `;
    }

    if (argsNotProvidedCount === 0) return;

    argumentCheck = (argumentCheck.slice(0, argumentCheck.length - 3) + "]").padEnd(35, ".");
    argumentCheck = argumentCheck.replace(/(PASS)/g, "PASS".green);
    argumentCheck = argumentCheck.replace(/(FAIL)/g, "FAIL".red);
    message += `${argumentCheck} [${argsNotProvidedCount.toString().red}] argument(s) were not provided `;

    let errorLocation = "unknown";
    let functionName = this.stack ? (this.stack.includes("Function.") ? this.stack.split("Function.")[1] : "unknown") : null;
    if (functionName && functionName != "unknown") {
      errorLocation = functionName.substring(functionName.indexOf(":") + 1, functionName.indexOf(")"));
      functionName = functionName.substring(0, functionName.indexOf("(")).trim();
    }

    message += `(${functionName.yellow}:${errorLocation.red}) ${"!!".red}`;
    message.print(true);
  }
}
