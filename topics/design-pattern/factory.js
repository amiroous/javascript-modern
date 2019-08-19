class CarFactory {

    constructor() {

    }

    static create(make) {

        const className = make.replace(/^[a-z]/, x => x.toUpperCase());

        const newClass = new Function('', `
            return class ${className} {
                constructor() {
                    this.toString();
                }
            }
        `)();

        Object.assign(newClass.prototype, {
            toString: this.toString,
            move: this.move,
            stop: this.stop,
            park: this.park
        });

        return newClass;
    }

    static move() {
        return new Promise(resolve => {
            console.log(`>>> The ${this.constructor.name} Moves.`);
            resolve(this);
        });
    }

    static stop() {
        return new Promise(resolve => {
            console.log(`>>> The ${this.constructor.name} Stops.`);
            resolve(this);
        });
    }

    static park() {
        return new Promise(resolve => {
            console.log(`>>> The ${this.constructor.name} Parked.`);
            resolve(this);
        });
    }

    static toString() {
        console.log(`A ${this.constructor.name} is Created.`);
    }
}


const Toyota = CarFactory.create('toyota');
const Ford = CarFactory.create('ford');

const myToyota = new Toyota();
const myFord = new Ford();

myToyota
    .move()
    .then(myToyota.stop())
    .then(myToyota.park());
