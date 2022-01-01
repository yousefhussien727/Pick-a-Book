var form = document.querySelector("#searchby-id");
if (!form)
    alert("Error: Form = " + form);

form.addEventListener('submit', e => {
    const input = document.getElementById('bookID').value;
    const data = { bookID: input };

    // Post Url: 'http://localhost:5000/book'
    fetch(window.location.origin + '/book' + '/getBookbyID', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .then(data => {
            if (data.book.length > 0)
                window.location.href = "/book?bookID=" + data.book[0].bookID;
            else
                alert("No Book Found! Try Again..");
        })
        .catch(err => console.log(err));

    e.preventDefault();
});

var form2 = document.querySelector("#searchby-title");
if (!form2)
    alert("Error: Form = " + form2);

form2.addEventListener('submit', e => {
    const input = document.getElementById('bookTitle').value;
    const data = { title: input };

    // Post Url: 'http://localhost:5000/book'
    fetch(window.location.origin + '/book' + '/getBookbyTitle', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .then(data => {
            if (data.book.length > 0)
                window.location.href = "/book?bookID=" + data.book[0].bookID;
            else
                alert("No Book Found! Try Again..");
        })
        .catch(err => console.log(err));

    e.preventDefault();
});