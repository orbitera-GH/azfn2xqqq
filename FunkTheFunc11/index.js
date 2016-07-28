var util = require('util');
var async = require('async');
var appInsights = require("applicationinsights");

//appInsights.setup("jennn75xcjm11rhjdi068xa04tqs8ymxeffk3kgm").start();
//var client = appInsights.getClient("jennn75xcjm11rhjdi068xa04tqs8ymxeffk3kgm");
appInsights.setup("54d915d2-c67d-4d23-8de1-7f50a99251a6").start();
var client = appInsights.getClient("54d915d2-c67d-4d23-8de1-7f50a99251a6");

function formatArgs(args){
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}
console.log = function(){
    client.trackTrace(formatArgs(arguments) + " >> ", 1);
};
console.info = function(){
    client.trackTrace(formatArgs(arguments) + " >> ", 0);
};
console.warn = function(){
    client.trackTrace.apply(client, formatArgs(arguments), 2);
};
console.error = function(){
    client.trackTrace.apply(client, formatArgs(arguments), 4);
};
console.debug = function(){
    client.trackTrace.apply(client, formatArgs(arguments), 3);
};

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    client.trackEvent("custom event", {customProperty: "custom property value"});
    client.trackException(new Error("handled exceptions can be logged with this method"));
    client.trackMetric("custom metric", 3);
    client.trackTrace("trace message");
    
    if(myTimer.isPastDue)
    {
        context.log('Node.js is running late!');
    }
    
    console.info('info stuff 1');
    console.log('log stuff 2');
    
    context.log('Node.js timer trigger function ran!', timeStamp);   
    
    async.parallel([
        function (cb) {
            context.log('wow');
            return cb();
        },
        function (cb) {
            context.log('zee');
            return cb();
        }
    ],
    function (err, results) {
        context.log('ended 2');
		context.bindings.processStuff2 = { body: 'New GitHub comment: ' + timeStamp };

        context.done();
    });
  
};