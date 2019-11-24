const path = require("path");
const FileHandler = require(path.join(__dirname, "FileHandler.js"));
const readline = require("readline-sync");

class RaceManager {

  constructor(resources) {
    this.memberList = [];
    this.resources = resources;
  }

  startRace() {
    console.log("Starting race...");
    this.getMembers();
  }

  getMembers() {
    var guild = this.resources.guild;
    var subID = this.resources.getRoleByName("subscriber");
    var excludeID = this.resources.getRoleByName("excludeFromRace");

    guild.members.forEach(member => {
      if(member.roles.has(excludeID.id)) {
        console.log('--excluding member: ' + member.displayName);
      } else {
        var temp = member.displayName;
        temp = temp.replace(/[^\w\s]/gi, '');
        temp = temp.charAt(0).toUpperCase() + temp.slice(1);
        temp = temp + '\n';

        this.memberList.push(temp);

        if(member.roles.has(subID.id))
          this.memberList.push(temp);
      }
    });

    this.memberList = this.shuffle(this.memberList);

    this.displayRacers();
    this.writeRacersToFile();
    this.getInput();
  }

  displayRacers() {
    console.log('\nRacers ready:\n');

    var racers = "";
    for(var i = 0; i < this.memberList.length; i++) {
      racers += this.memberList[i];
      console.log('-' + this.memberList[i].trim());
    }

    console.log('\nTotal racers: ' + this.memberList.length);
  }

  writeRacersToFile() {
    var members = "";
    for(var i = 0; i < this.memberList.length; i++) {
      members += this.memberList[i];
    }

    FileHandler.writeDataToFile(members, path.join(__dirname, "..", "marblerace", "MarbleRacers.csv"));
  }

  getInput() {
    var winner, winnerList = [];

    while(true) {
      winnerList = [];

      var answer = readline.question("Enter race winner: @");
      for(var i = 0; i < this.memberList.length; i++) {
        answer = answer.toLowerCase().trim();

        if(this.memberList[i].toLowerCase().trim().includes(answer) && !winnerList.includes(this.memberList[i]))
          winnerList.push(this.memberList[i]);
      }

      if(winnerList.length > 0)
        break;
      else {
        console.log("!! NO USERS FOUND");
      }
    }

    if(winnerList.length == 1) {
      console.log("> " + winnerList[0]);

      readline.question("=== PRESS ENTER TO CONFIRM ===");
      winner = winnerList[0];
    }
    else {
      for(var i = 0; i < winnerList.length; i++)
        console.log((i+1) + ". " + winnerList[i].trim());

      var number = readline.question("Enter number for winner: ");
      winner = winnerList[parseInt(number) - 1];
    }

    winner = this.resources.guild.members.find(user => user.displayName.toLowerCase().includes(winner.toLowerCase().trim()));

    var message = `Congratulations ${winner}, you are the winner of today's marble race!  Come to stream to claim your free Zero Credit reward!  You can redeem anything that is *WHITE*.  You don't have to redeem anything if you don't want to, but you can't save it for a different stream.`;

    var marbleChannel = resources.getChannelByName("marble-race");
    marbleChannel.send(message);

    console.log("winner: " + winner);
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

module.exports = RaceManager;
