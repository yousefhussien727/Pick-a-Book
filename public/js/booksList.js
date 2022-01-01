window.addEventListener('load', e => {
    fetch(window.location.origin + '/book' + '/getAllBooks', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            var books = data.books;
            const total = books.length;
            // <figure class="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item">
            //     <a href="preview.html">
            //         <div class="tm-gallery-item-overlay">
            //             <img src="url" class="img-fluid tm-img-center">
            //         </div>
            //         <p class="tm-figcaption">Book Title</p>
            //         <p class="tm-figcaption">Book Author</p>
            //     </a>
            // </figure>
            for (let i = 0; i < total; i++) {
                var figure = document.createElement("figure");
                document.querySelector('.tm-gallery .row').appendChild(figure);
                figure.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "tm-gallery-item", "book-" + i);

                var alink = document.createElement("a");
                figure.appendChild(alink);
                alink.href = "/book?bookID=" + books[i].bookID;

                var div = document.createElement("div");
                alink.appendChild(div);
                div.classList.add("tm-gallery-item-overlay");

                var img = document.createElement("img");
                div.appendChild(img);
                div.classList.add("img-fluid", "tm-img-center");
                img.src = books[i].image_url;
                img.style = "width: 240px; height: 360px; object-fit: cover;";

                var title = document.createElement("p");
                title.appendChild(document.createTextNode(books[i].title));
                alink.appendChild(title);
                title.classList.add("tm-figcaption");
                title.style = "padding-bottom: 5px; font-weight: bold;";

                var author = document.createElement("p");
                author.appendChild(document.createTextNode("By: " + books[i].author[0]));
                alink.appendChild(author);
                author.classList.add("tm-figcaption");
            }

        })
        .catch(err => console.log(err));

    e.preventDefault();
});