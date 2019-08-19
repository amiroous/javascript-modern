/*
class DataBase {

    constructor(data) {

        if (DataBase.exists) {
            return DataBase.instance;
        }

        this._data = data;

        DataBase.instance = this;
        DataBase.exists = true;

        return this;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }
}

const mysql = new DataBase('MySQL Data');
const postgres = new DataBase('Postgres Data');
console.log(mysql.data, postgres.data); // MySQL Data MySQL Data

postgres.data = 'New Data';
console.log(mysql.data, postgres.data); // New Data New Data
*/



class Spinner {

    constructor({theme = 'light', container = document.body} = {}) {
        if(Spinner.exists) {
            return Spinner.instance;
        }

        Spinner._theme = theme;
        Spinner.container = container;

        Spinner.instance = this;
        Spinner.Element = null;
        Spinner.spinning = false;
        Spinner.exists = true;
    }

    static addSpinnerElement() {

        if (Spinner.Element) {
            return;
        }

        Spinner.container.insertAdjacentHTML('afterbegin', '<div id="spinner"></div>');
        Spinner.Element = document.getElementById('spinner');
    }

    static removeSpinnerElement() {

        if (!Spinner.Element) {
            return;
        }

        Spinner.Element.remove();
        Spinner.Element = null;
    }

    start() {

        if (Spinner.spinning) {
            return;
        }

        Spinner.addSpinnerElement();
        // this._action = setInterval(() => console.log('Spinner Spinning ...'), 100);
        Spinner.spinning = true;
    }

    stop() {

        if (!Spinner.spinning) {
            return;
        }

        Spinner.removeSpinnerElement();

        // clearInterval(this._action);
        // console.log('Spinner Stopped.');
        Spinner.spinning = false;
    }

}

const sp = new Spinner();
setTimeout(sp.start, 300);
setTimeout(sp.stop, 3000);
