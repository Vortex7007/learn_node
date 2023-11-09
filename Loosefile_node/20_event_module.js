//Event module
//Node.js has a built in module called "events",
//where you can create -, fire-, and listen for- your own events.]

//Example 1- registering for the event to be fired only one time using opnce.

//Example 2- Create and event emitter instance and register a couple of callbacks

//Example 3- Registering for the event with callback parameters

const EventListener = require('events')
const event = new EventListener();
const event2 = new EventListener();

event.on("vortex", () =>{
    console.log("your name is anshu");  
})
event.on("vortex", () =>{
    console.log("your name is kumar");  
})
event.on("vortex", () =>{
    console.log("your name is mandal");
})

event.emit("vortex")

event2.on("page", (code,msg)=>{
    console.log(`the code is ${code} and the message is ${msg}`);
})
event2.emit("page",200,"ok")