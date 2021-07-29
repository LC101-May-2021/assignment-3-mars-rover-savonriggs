class Rover {
  constructor(position) {
    this.position=position;
    this.mode='NORMAL';
    this.generatorWatts=110;
  }
receiveMessage(message){
  let response = {
    message:message.name,
    results:[]
 };
  //let cmdObj;
  //let responseArray = [];
  //response.message = message.name;

  
  for (let i=0;i<message.commands.length;i++) {
  // let roverStatus={}
  // console.log(type)

//cmdObj={}


if(message.commands[i].commandType ==='STATUS_CHECK') {
 response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
}
else if (message.commands[i].commandType==='MOVE'  && this.mode === 'LOW_POWER') {
response.results.push({completed: false})
  }
else if(message.commands[i].commandType==='MOVE') {
  this.position=message.commands[i].value
  response.results.push({completed: true})
}
else if(message.commands[i].commandType==='MODE_CHANGE') { 
this.mode=message.commands[i].value
  response.results.push({completed: true})
}
  
}

//responseArray.push(cmdObj)
  


 // response.results = responseArray
  return response;
}}
  




module.exports = Rover;