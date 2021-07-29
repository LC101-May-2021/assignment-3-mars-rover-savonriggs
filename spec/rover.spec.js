const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    
    let rover=new Rover(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect (rover.generatorWatts).toEqual(110);
    expect (rover.position).toEqual(98382);

  })
  it("response returned by receiveMessage contains name of message", function() {
   let response=new Rover(7245)
   let commands=[new Command('STATUS_CHECK'), new Command('MOVE', 20)]
   let message=new Message('Test message',commands)
expect(response.receiveMessage(message).message).toEqual('Test message');
    
  })
  it("response returned by receiveMessage includes two results if two commands are sent in the message",  function() {
  let rover=new Rover(7289)
  let message=new Message('Two command message',[
   new Command('MODE_CHANGE', 'LOW_POWER'),
    new Command('STATUS_CHECK')])
  let response=rover.receiveMessage(message)
expect(response.results.length).toEqual(2);
  })
  it("responds correctly to status check command",
  function(){
    //console.log("word")
    let rover=new Rover(2)
    let commands=[new Command('STATUS_CHECK')]
    let message=new Message('New message', commands)
    let response=rover.receiveMessage(message)
    let firstResult=response.results[0]
    
   expect(firstResult.roverStatus.mode).toEqual('NORMAL')
 //roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
  })
  it("responds correctly to mode change command",
  function(){
    let rover=new Rover(4)
    let commands=[new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK')]
    let message=new Message('New message', commands)
    let response=rover.receiveMessage(message)
    
  
  //console.log(response.results.)
    expect(rover.mode).toEqual('LOW_POWER')
    expect(response.results[0]).toEqual({completed: true})

  })
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover=new Rover(4)
    let commands=[new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 34),]
    let message=new Message('New message', commands)
    let response=rover.receiveMessage(message)
  
    expect(response.results[1]).toEqual({completed: false})
  })
  it("responds with position for move command", function(){
    let rover=new Rover(4)
    let commands=[ new Command('MOVE', 34)]
    let message=new Message('New message', commands)
    let response=rover.receiveMessage(message)
  
     expect(rover.position).toEqual(34)
  })

});

/*let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);*/

/*let rover=new Rover(98765)
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    let message=new Message('Two command message',commands);
    let response = rover.receiveMessage(message);
    expect(response.recieveMessage(message).message).toEqual('LOW POWER','STATUS CHECK')*/