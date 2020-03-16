# Inheritance vs. Composition 

[Back](../README.md)
<p></p><p></p>

### Problem with Inheritance
> The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. 
> You wanted a banana but what you got was a gorilla holding the banana and the entire jungle. - Joe Armstrong. Creator of Erlang.

### Solution:
1. Duplicated the Method to Different Classes as They Need. (Duplication, Maintenance of Same Functionality at Multiple Places)
2. Create a Higher Level Class to Abstract Common Attributes and Methods (God object Anti Pattern, Gorilla-Banana Issue)
3. Use Composition

### Inheritance (What things Are - IS A Relationship)
> With Inheritance, you're describing exactly what objects are and how they are related to each other.
```ecmascript 6
class Creature {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} eats.`);
    }

    drink() {
        console.log(`${this.name} drinks.`);
    }

    sleep() {
        console.log(`${this.name} sleeps.`);
    }
}

class Human extends Creature {
    talk() {
        console.log(`${this.name} talking.`);
    }
    swim() {
        console.log(`${this.name} swims.`);
    }
    fly() {
        console.log(`${this.name} flies.`);
    }
}

class Dog extends Creature {
    bark() {
        console.log(`${this.name} barks.`);
    }
}

class Fish extends Creature {
    swim() {
        console.log(`${this.name} swims.`);
    }
}

class Bird extends Creature {
    fly() {
        console.log(`${this.name} flies.`);
    }
}

const human = new Human('John');
human.swim(); // John swims.
```

### Composition (What things Do - HAS A Relationship)
> With Composition, you're describing what an object can do 

__Using Pure Functions__
```ecmascript 6
/**
 Define Behaviors
 */
const eater     = (self) => ({ eat: console.log(`${self.name} eats.`) });
const drinker   = (self) => ({ drink: console.log(`${self.name} drinks.`) });
const sleeper   = (self) => ({ sleep: console.log(`${self.name} sleeps.`) });
const talker    = (self) => ({ talk: console.log(`${self.name} talks.`) });
const swimmer   = (self) => ({ swim: console.log(`${self.name} swims.`) });
const flier     = (self) => ({ fly: console.log(`${self.name} flies.`) });
const barker    = (self) => ({ bark: console.log(`${self.name} barks.`) });

/**
 Create Objects and Assign Behaviors
 */
// const Human = (name) => {
//     const self = { name };
//
//     return Object.assign(
//         self,
//         eater(self),
//         drinker(self),
//         sleeper(self),
//         talker(self),
//         swimmer(self),
//         flier(self)
//     );
// };

const Human = (name) => {
    const self = { name };

    return {
        ...self,
        ...eater(self),
        ...drinker(self),
        ...sleeper(self),
        ...talker(self),
        ...swimmer(self),
        ...flier(self)
    }
};

const human = Human('John');
human.swim(); // John swims.
```

__Using ES6 Classes__
```ecmascript 6
const eater     = (superclass) => class extends superclass {
    eat() {
        console.log(`${this.name} eats.`);
    }
};
const drinker   = (superclass) => class extends superclass {
    drink() {
        console.log(`${this.name} drinks.`);
    }
};
const sleeper   = (superclass) => class extends superclass {
    sleep() {
        console.log(`${this.name} sleeps.`);
    }
};
const talker    = (superclass) => class extends superclass {
    talk() {
        console.log(`${this.name} talks.`);
    }
};
const swimmer   = (superclass) => class extends superclass {
    swim() {
        console.log(`${this.name} swims.`);
    }
};
const flier     = (superclass) => class extends superclass {
    fly() {
        console.log(`${this.name} flies.`);
    }
};
const barker    = (superclass) => class extends superclass {
    bark() {
        console.log(`${this.name} barks.`);
    }
};

class Human extends compose(eater, swimmer)(class {}) {
    constructor(name) {
        super();
        this.name = name;
    }
}

const human = new Human('John');
human.swim(); // John swims.
```






