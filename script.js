let bookApi = 'http://localhost:3000/books';

function start() {
    getBooks(renderBooks);
    handleCreateBooks();
}

start();


function getBooks(callback) {
    fetch(bookApi)
        .then(response => response.json())
        .then(callback)
}

function CreateBooks(data, callback) {
    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(bookApi, option)
        .then(response => response.json())
        .then(callback)
}

function renderBooks(book) {
    let htmls = book.map(e => `
    <div class="book-item">
        <ul class="book-item-${e.id}">
            <h2>${e.title}</h2>
            <img width="100" src="${e.img_url}" alt="${e.title}">
            <li>author: ${e.author}</li>
            <li>price: ${e.price}$</li>
            <button onclick="handleDeleteBook(${e.id})">Remove</button>
            <button onclick="handleModifyBook(${e.id})">Modify</button>
        </ul>
    </div>
    `).join('');
    document.querySelector('#wrapper').innerHTML = htmls;
}
// create new book item
function handleCreateBooks() {
    let createBtn = document.querySelector('#create');
    createBtn.onclick = function () {
        var img_url = document.querySelector('input[name="url"]').value;
        var title = document.querySelector('input[name="title"]').value;
        var author = document.querySelector('input[name="author"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var dataform = {
            img_url: img_url,
            title: title,
            author: author,
            price: price
        }
        CreateBooks(dataform, getBooks(renderBooks));
    }
}

// take data to update
function handleModifyBook(modifyid) {
    getBooks(function (book) {
        for (var e of book) {
            if (e.id === modifyid) {
                document.querySelector('input[name="url"').value = e.img_url
                document.querySelector('input[name="title"]').value = e.title;
                document.querySelector('input[name="author"]').value = e.author;
                document.querySelector('input[name="price"]').value = e.price;
                document.querySelector('#create').id = "update";
                document.querySelector('#update').value = "update";
                let updateBtn = document.querySelector('#update');
                updateBtn.onclick = function () {
                    var img_url = document.querySelector('input[name="url"').value;
                    var title = document.querySelector('input[name="title"]').value;
                    var author = document.querySelector('input[name="author"]').value;
                    var price = document.querySelector('input[name="price"]').value;
                    var dataform = {
                        img_url: img_url,
                        title: title,
                        author: author,
                        price: price
                    }
                    ModifyBook(modifyid, dataform);
                }
            }
        }
    })

}

// update item
function ModifyBook(id, data) {
    let option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(bookApi + '/' + id, option)
        .then(response => response.json())
        .then(getBooks(renderBooks))
}
// remove item
function handleDeleteBook(id) {
    let option = {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'
        }
    }

    fetch(bookApi + '/' + id, option)
        .then(response => response.json())
        .then(function () {
            let bookItem = document.querySelector('.book-item-' + id);
            bookItem ? bookItem.remove() : "";
        });
}


