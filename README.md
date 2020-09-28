## Overview
  MultiClass is a JavaScript library to allow developers to extends more than one class in node js.

## Install
  To install MultiClass library just execute the following command line in prompt inside your node project folder

  $ npm install multiclass

## Usage
const MultiClass = require('multiclass);

class One {
    constructor() {
        this.number = 1;
    }
    foo() {console.log('foo')}
}

class Two {
    constructor() {
        this.test = 'this is an instance variable for test'
        this.bar = this.bar.bind(this);
    }
    testFunction() {

    }

    static testFunction() {
        console.log('This is a static function');
    }

    bar() {console.log('bar')}
}

class Three {
    constructor() {
        
    }
    static OtherTest() {
        console.log('This is an Other static function');
    }
    baz() {console.log('baz')}
}

class FooBar extends new MultiClass(One, Two, Three) {
    constructor() {
        super(); // needed, although does nothing.
    }    
    oh() {console.log('oh')}
    yeah() {console.log('yeah')}
}

FooBar.testFunction();
FooBar.OtherTest();
let f = new FooBar();
console.log(f.test)
console.log(f.number)
f.foo();
f.bar();
f.baz();
f.oh();
f.yeah();
