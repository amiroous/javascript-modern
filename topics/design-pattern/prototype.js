const firstCar = {

    type: 'SUV',

    accelerate() {
        console.log(`First Car is Moving`);
    }
};

const secondCar = Object.create(firstCar, {

    color: {
        value: 'Black'
    },
    accelerate: {
        value: () => {
            console.log(`Second Car is Moving`);
        }
    },
});

console.log(firstCar.isPrototypeOf(secondCar)); // true

console.log(firstCar.type); // SUV
console.log(secondCar.type); // SUV

firstCar.accelerate(); // First Car is Moving
secondCar.accelerate(); // Second Car is Moving
