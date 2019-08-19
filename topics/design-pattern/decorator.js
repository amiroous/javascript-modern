class Book {

    constructor(title, author, price) {
        this._title = title;
        this._author = author;
        this._price = price;
        this._details = `${this._title} by ${this._author} for $${this._price}`;
    }

    get details() {
        return this._details;
    }

    set details(details) {
        this._details = details;
    }
}

function giftWrap(book) {
    book.isGiftWrapped = true;
    book.details += `, is Wrapped as a Gift`;
    book.unwrap = (book) => `${book.details} and now is unwrapped`;

    return book;
}

function bundleWithCd(book) {
    book.isBundledWithCd = true;
    book.details += `, is bundled with a CD + $5`;

    return book;
}


const alchemist = new Book('The Alchemist', 'Paulo Coelho', 10);
console.log(alchemist.details);

giftWrap(alchemist);
console.log(alchemist.details);

bundleWithCd(alchemist);
console.log(alchemist.details);