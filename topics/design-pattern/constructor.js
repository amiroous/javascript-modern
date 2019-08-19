/**
 * Traditional Function based Class (ProtoType)
 */
// function Vehicle(type) {
//
//     this._prototypeName = this.constructor.name;
//     this._type = type;
//
//     this.getType = () => {
//         return this._type;
//     };
//
// }

// const Vehicle = function(type) {
//
//     this._prototypeName = this.constructor.name;
//     this._type = type;
//
//     this.getType = () => {
//         return this._type;
//     };
//
// };


/**
 * ES6 Class
 */
class Vehicle {

    constructor(category) {
        this._prototypeName = this.constructor.name;
        this._category = category;
    }

    get category() {
        return this._category;
    }

}

class Automobile extends Vehicle {

    constructor(make, type, model) {
        super('Automobile');
        this._make = make;
        this._type = type;
        this._model = model;
    }

    move() {
        return `${this.category} moves.`;
    }

    stop() {
        return `${this.category} stops.`;
    }

    park() {
        return `${this.category} parked.`;
    }

    get make() {
        return this._make;
    }

    get type() {
        return this._type;
    }

    get model() {
        return this._model;
    }

    toString() {
        return `A ${this.category} Made By ${this._make} with Type of ${this.type}, Model of ${this.model}`;
    }
}

class Toyota extends Automobile {

    constructor(type, model) {
        super('Toyota');
        this._type = type;
        this._model = model;
    }

    park() {
        return `${this._model} ${this.category} parked.`;
    }
}

class Chevrolet extends Automobile {

    constructor(type, model) {
        super('Chevrolet');
        this._type = type;
        this._model = model;
    }

    static create(type, model) {
        return new Chevrolet(type, model);
    }
}


const myToyota = new Toyota('Medium SUV', 'Highlander');
const myChevrolet = Chevrolet.create('Large SUV', 'Suburban');

console.log(myToyota);
console.log(myChevrolet);