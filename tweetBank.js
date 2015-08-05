var _ = require('underscore');

//private tweet storage not accessible in module.exports
var data = [];

//functions
var add = function (name, text) {
  data.push({ name: name, text: text });
};

//_.clone will send a pointer to the data array but not a duplication
var list = function () {
  return _.clone(data);
};

//_.where will return an array with the tweets that match the properties in find
var find = function (properties) {
  return _.where(data, properties);
};

module.exports = { add: add, list: list, find: find };


//fake tweets to emulate our app
var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}

//console.log(data);
