const fs = require("fs");
const path = require("path");

exports.props = {
  "requiresElevation": "owner",
  "description": "shuts the bot down immediately",
  "usage": ""
};

exports.run = (client, message, args) => {
  let exitCode = 1;
  if(args.length == 1 && args[0].toLowerCase().includes("force"))
    exitCode = 2;

  process.exit(exitCode);
}
