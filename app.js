
const myLibrary = [];
let bNumber = 0;

function Book(author, title, noPages, read){
    this.author = author;
    this.title = title;
    this.noPages = noPages;
    this.read =  'No';
    this.bookNo = bNumber ++;
}

const addBookForm = () => {
    document.getElementById('bookForm').className = 'addBookForm';

}

function gatherBookDataAndSubmit(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const noPages = document.getElementById('numberPages').value;
    const readOrNot = document.getElementById('read').value;
    closeBookForm();
    addBookToLibrary(author, title,  noPages, readOrNot);
}

const closeBookForm = () => {
    document.getElementById('bookForm').className = 'hide';
}

function addBookToLibrary(author, title, noPages, read){
    const book = new Book(author,title, noPages, read);
    myLibrary.push(book);
    displayBooks(myLibrary);
}

function removeCardFromArray(book)
{
    var index = myLibrary.indexOf(book);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

function transferDataToCard(cardToBeAdded, book){
    cardToBeAdded.getElementsByClassName('title').item(0).innerHTML += book.title;
    cardToBeAdded.getElementsByClassName('author').item(0).innerHTML += book.author;
    cardToBeAdded.getElementsByClassName('pages').item(0).innerHTML = 'Pages:' + book.noPages;
    // cardToBeAdded.getElementsByClassName('read').item(0).innerHTML = book.read;
    createCardDeleteBtn(cardToBeAdded,book);
}

function createCardDeleteBtn(cardToBeAdded, book){
    document.getElementById('cardContainer').appendChild(cardToBeAdded);
    document.getElementById('rBtn').id = 'rBtn'+ book.bookNo;
    document.getElementById('rBtn'+ book.bookNo).addEventListener("click",function (){
        document.getElementById('cardLibrary' + book.bookNo).className = 'hide';
        removeCardFromArray(book);
        // bNumber--;
    })
}


function createCardReadButton(cardToBeAdded, book){
    let readBtn = document.createElement('button');
    readBtn.innerHTML = 'Read';
    readBtn.className = 'readBtn';
    readBtn.addEventListener("click", function (){
            let index = myLibrary.indexOf(book);
            if(myLibrary[index].read === 'No'){
                myLibrary[index].read = 'Yes';
                readBtn.style.background = 'blue'
                document.getElementById('cardLibrary' + book.bookNo).style.borderLeft = '8px solid blue'
            }
            else{
                myLibrary[index].read = 'No';
                readBtn.style.background = 'red'
                document.getElementById('cardLibrary' + book.bookNo).style.borderLeft = '8px solid red'
            }
    })
    cardToBeAdded.appendChild(readBtn);
}

function displayBooks(myLibrary){
    let cardToBeAdded = document.createElement('div');
    for(let book of myLibrary){
        cardToBeAdded.innerHTML = "";
        cardToBeAdded.className = 'cardLibrary' + book.bookNo;
        cardToBeAdded.id = 'cardLibrary' + book.bookNo;
        // cardToBeAdded.id = book.bookNo;
        cardToBeAdded.innerHTML = ('<div class="cardImg">\n' +
            '                         <img src="../images/book-open-blank-variant.png">\n' +
            '                          </div>\n' +
            '                    <div class="cardDiv">\n' +
            '                        <p class="title">Title: </p>\n' +
            '                        <p class="author">Author: </p>\n' +
            '                        <p class="pages">Pages: </p>\n' +
            // '                        <button id="readBtn">READ</button>\n' +
            '                        <div class="cardContent">\n' +
            '                             <button  id="rBtn" value="a" class="removeBtn">X</button>\n' +
            '                        </div>\n' +
            '                    </div>' );
//comment
        transferDataToCard(cardToBeAdded,book);
        // checkBookReadStatus(book);
        createCardReadButton(cardToBeAdded,book);

    }
    console.log('book Ni,ner: ' + bNumber);
    // bNumber ++;
    console.log(myLibrary);
}



