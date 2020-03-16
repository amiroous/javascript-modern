import compose from "lodash/fp/compose";
import './styles/index.scss';

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


//
//
// class Creature {
//     constructor(name) {
//         this.name = name;
//     }
//
//     eat() {
//         console.log(`${this.name} eats.`);
//     }
//
//     drink() {
//         console.log(`${this.name} drinks.`);
//     }
//
//     sleep() {
//         console.log(`${this.name} sleeps.`);
//     }
// }
//
// class Human extends Creature {
//
//     constructor(name) {
//         super();
//         return Object.assign(
//             this,
//             eater(name),
//             drinker(name),
//             sleeper(name),
//             talker(name),
//             swimmer(name),
//             flier(name)
//         );
//     }
// }
//
// class Dog extends Creature {
//     bark() {
//         console.log(`${this.name} barks.`);
//     }
// }
//
// class Fish extends Creature {
//     swim() {
//         console.log(`${this.name} swims.`);
//     }
// }
//
// class Bird extends Creature {
//     fly() {
//         console.log(`${this.name} flies.`);
//     }
// }
//
// const human = new Human('John');
// human.swim();



