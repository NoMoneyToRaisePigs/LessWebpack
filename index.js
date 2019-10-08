function student(name){
    this.name = name;

}

student.prototype.greet = function(){
    console.log('hello');
}

function badStudent(){
    this.home = '';
}


student('gaofan');
badStudent.prototype = Object.create(student.prototype);
badStudent.prototype.nickName = "bad";
badStudent.constructor = badStudent;


var x = 'xxx';
var s = new badStudent();
var z = 0;

var arg;

student(arg = 'pop');

console.log('ooo');

var xx = (function(window){
    console.log('I am an IIFE module, I have been executed');
    window.xxx = {a: 1, b: 2, c: 3};

    var name = "gaofan";
    var greet = function(value){
        console.log(`heellooo ${value}`);
    };

    var expose = {
        name: name,
        greet: greet
    };

    return expose;
}(window));


var l = 0;