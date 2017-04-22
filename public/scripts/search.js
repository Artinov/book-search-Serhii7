$(document).ready(function() {

    $("form").submit(function() {
        var bookName = $("#search").val();
        bookName = bookName.toLowerCase();
        bookName = bookName.trim();

        $.ajax({
            url: "/bookSearch",
            method: "POST",
            data: {
                bookName: bookName,
            }
        }).then(function(books) {
            $("#books").html("");

            var $booksWrapper = $("#books");
            
            if(books.length == 0 ){
                $booksWrapper.html("<h1>Can not find</h1>");
                return;
            }
            books.forEach(function(book) {
                var $bookTemplate = $("#template > div").clone();

                $bookTemplate.find("[data-book-name]").text(book.name);
                $bookTemplate.find("[data-book-author]").text(book.author);
                $bookTemplate.find("[data-book-image]").attr("src", book.picture);
                $bookTemplate.find("[data-book-tags]").text(book.tags);
                $bookTemplate.find("[data-book-link]").attr("href", "/book/" + book.id);

                $booksWrapper.append($bookTemplate);
            });
        });
        return false;
    });
});