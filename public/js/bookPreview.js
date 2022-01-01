window.addEventListener('load', () => {
    const param = (new URL(document.location)).searchParams;
    const bookID = param.get('bookID');
    const data = { bookID: bookID };

    fetch(window.location.origin + '/book' + '/getBookbyID', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            var book = data.book[0];

            document.getElementById('title').innerHTML = book.title;
            document.getElementById('isbn').innerHTML = book.isbn;
            document.getElementById('genre').innerHTML = book.genre;
            document.getElementById('author').innerHTML = book.author;
            document.getElementById('condition').innerHTML = book.condition;
            document.getElementById('rating').innerHTML = book.rating;
            document.getElementById('desc').innerHTML = book.description;
            document.getElementById('price').innerHTML = book.price;
            document.getElementById('book-img').src = book.image_url;

            document.getElementById('buy-btn').href = window.location.origin + "/payment?price=" + book.price;

            // Get Book GoodReads Rating
            fetch("https://www.goodreads.com/book/review_counts.json?isbns=" + book.isbn, {
                mode: 'no-cors',
            }).then(res => {
                console.log(res);
                // document.getElementById('rating').innerHTML = book.rating;
            }).catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    // const book_isbn = document.getElementById('isbn').innerText;
    // console.log("ISBN: " + book_isbn);

});