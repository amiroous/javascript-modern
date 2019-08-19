class CalculatorV1 {

    constructor() {

        this.operate = function (num1, num2, operator) {

            switch (operator) {
                case 'add':
                    return num1 + num2;
                case 'sub':
                    return num1 > num2 ? num1 - num2 : num2 > num1 ? num2 - num1 : 0;
                default:
                    return NaN;
            }
        }
    }
}

class CalculatorV2 {

    constructor() {

        this.add = (num1, num2) => num1 + num2;
        this.sub = (num1, num2) => num1 > num2 ? num1 - num2 : num2 > num1 ? num2 - num1 : 0;
    }

}

class CalculatorAdapter {

    constructor() {

        // Cover new API
        const calc = new CalculatorV2();

        // Support old API
        calc.operate = function (num1, num2, operator) {

            switch (operator) {
                case 'add':
                    return calc.add(num1, num2);
                case 'sub':
                    return calc.sub(num1, num2);
                default:
                    return 'Operation Failed!';
            }
        };

        return calc;
    }

}

const calcV1 = new CalculatorV1();
console.log( calcV1.operate(5,2, 'add') );

const calcV2 = new CalculatorV2();
console.log( calcV2.add(5,2) );

const calcRapid = new CalculatorAdapter();
console.log( calcRapid.operate(5,2, 'add') );
console.log( calcRapid.add(5,2) );