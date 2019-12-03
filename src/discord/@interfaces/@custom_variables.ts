import { Guild, GuildMember } from 'discord.js';

export namespace Variables {
  export class Default {
    static getValue(variableName: string, args: GuildMember | Guild): any {
      variableName = variableName.replace(/[${}]/g, "");

      let variableTypes = Object.values(DefaultVars);
      for (let i = 0; i < variableTypes.length; i++) {
        let variableType = variableTypes[i];

        let index: number;
        index = Object.keys(variableType).indexOf(variableName);

        if (index !== -1) {
          const command = Object.values(variableType)[index];
          return command(args);
        }
      }
    }

    static getValueType(variableName: string): typeof GuildMember | typeof Guild {
      variableName = variableName.replace(/[${}]/g, "");

      let variableTypes = Object.values(DefaultVars);
      for (let i = 0; i < variableTypes.length; i++) {
        let variableType = variableTypes[i];

        let index: number;
        index = Object.keys(variableType).indexOf(variableName);

        if (index !== -1) {
          if (variableType === DefaultVars.GuildVars) return Guild;
          if (variableType === DefaultVars.MemberVars) return GuildMember;
        }
      }

      return null;
    }

    static getDefaultVariableNames(options?: { guildVariables?: boolean; memberVariables?: boolean }): [string, string][] {
      if (!options) options = { guildVariables: true, memberVariables: true };
      if (!options.guildVariables) options.guildVariables = true;
      if (!options.memberVariables) options.memberVariables = true;

      let returnVariables: [string, string][] = [null, null];

      let guildVariables: [string, string][] = [null, null];
      if (options.guildVariables) {
        let guildVars = Object.values(DefaultVars.GuildVars);
        let guildDesc = Object.values(DefaultVars.GuildVars.descriptions);
        for (let i = 0; i < guildVars.length; i++) guildVariables.push([guildVars[i], guildDesc[i]]);

        returnVariables = guildVariables.slice(1);
      }

      let memberVariables: [string, string][] = [null, null];
      if (options.memberVariables) {
        let memberVars = Object.values(DefaultVars.MemberVars);
        let memberDesc = Object.values(DefaultVars.MemberVars.descriptions);
        for (let i = 0; i < memberVars.length; i++) memberVariables.push([memberVars[i], memberDesc[i]]);

        returnVariables = memberVariables.slice(1);
      }

      if (options.guildVariables && options.memberVariables) returnVariables = guildVariables.concat(memberVariables);

      return returnVariables;
    }
  }

  export class Custom {
    customVariables: {
      [key: string]: string;
    };

    getValue(variableName: string, ...args: any): any {
      variableName = variableName.replace(/[${}]/g, "");

      let variableType = Object.values(CustomVars.CustomVars);

      let index: number;
      index = Object.keys(variableType).indexOf(variableName);

      if (index !== -1) {
        const command = Object.values(variableType)[index];
        return command(args);
      }
    }

    getCustomVariableNames(): string[] {
      return Object.values(CustomVars.CustomVars);
    }

    /**
     * Adds a new custom variable that can be retrieved
     *
     * @param {string} variableName the variable's name, `e.g. "memberCount"`
     * @param {*} arg the argument to search with, `e.g. message.guild`
     * @param {*} searchCriteria the search criteria for the argument `e.g. memberCount`
     */
    addVariable(variableName: string, arg: any, searchCriteria: any): void {
      CustomVars.CustomVars.prototype[variableName] = (): any => {
        return (arg as typeof arg)[searchCriteria as typeof searchCriteria];
      };
    }
  }

  export namespace DefaultVars {
    export class MemberVars {
      static member = (guildMember: GuildMember): GuildMember => {
        return guildMember;
      };
      static memberName = (guildMember: GuildMember): string => {
        return guildMember.displayName;
      };

      static descriptions = {
        member: "the current member, as a mention",
        memberName: "the current member, but only their name (no mention)"
      };
    }

    export class GuildVars {
      static memberCount = (guild: Guild): number => {
        return guild.memberCount;
      };
      static guildName = (guild: Guild): string => {
        return guild.name;
      };

      static descriptions = {
        memberCount: "the current number of members in the guild",
        guildName: "the name of the guild"
      };
    }
  }

  export namespace CustomVars {
    export class CustomVars {
      [variableName: string]: () => any;
    }
  }
}
