const pg = require('pg-promise')()
const assert = require('assert')

const postgresConfig = {
  host: 'localhost',
  port: 5432,
  database: 'pg-promise-exercises',
  user: 'emmabrown', // replace this with your username
  password: '' //  replace this if you have set a password for your username (this is unlikely)
}

const db = pg(postgresConfig)

/* -----------------------------------------
   Exercise 1
   -----------------------------------------

   This is an example function that finds all the books from the `books` table
   @function: `allBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]

   The assertion fails, and you have to make it pass.

*/

const allBooks = db.any('SELECT * FROM books')
/* This is calling the `then` function on the `allBooks` promise, and checks if
   we get back 15 rows. This assertion will fail. Make it PASS! */
allBooks.then(books => {
  assert.deepEqual(books.length, 15)
}).catch(error => {
  console.log('Dang, my assertion failed.', error)
})

/* --------End of Exercise 1---------------- */

/* -----------------------------------------
           Exercise 2
   -----------------------------------------

   Implement the function `firstTenBooks` which returns the first ten
   books, and make the assertion pass.
   @function: `firstTenBooks`
   @input params: None
   @output: [{id, title, author_id, subject_id}]

*/

let firstTenBooks = db.any('SELECT * FROM books LIMIT 10')
firstTenBooks.then(books => {
  assert(books.length, 10)
}).catch(error => {
  console.log('Whoops, my function doesnt behave as expected.', error)
})

/* --------End of Exercise 2---------------- */

/* -----------------------------------------
            Exercise 3
   -----------------------------------------

   Implement the function `findAuthorsOrderedByLastName` which returns all the
   authors from the the `authors` table, and the rows are ordered by the
   `last_name`.

   @function: `findAuthorsOrderedByLastName`
   @input params: None
   @output: [{id, first_name, last_name}]

*/

let findAuthorsOrderedByLastName = db.any('SELECT * FROM authors ORDER BY last_name')
findAuthorsOrderedByLastName.then(authors => {
  assert.deepEqual(authors.length, 19)
  assert.deepEqual(authors[0].last_name, 'Alcott')
  assert.deepEqual(authors[18].last_name, 'Worsley')
}).catch(error => {
  console.log('Whoops, my function doesnt behave as expected.', error)
})

/* --------End of Exercise 3---------------- */

/* -----------------------------------------
   Exercise 4
   -----------------------------------------

   Implement the function `findBookAuthors` which returns the `first_name` and
   `last_name` from the `authors` table, and the `title` of the
   books(from the `books` table) that the authors have written.

   @function: `findBookAuthors`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
   [{first_name: 'John', last_name: 'Worsley', title: 'Practical PostgreSQL'}
   {first_name: 'Paulette', last_name: 'Bourgeois', title: 'Franklin in the Dark'}
   {first_name: 'Margery Williams', last_name: 'Bianco', title: 'The Velveteen Rabbit'}
   {first_name: 'Louisa May', last_name: 'Alcott', title: 'Little Women'}
   {first_name: 'Stephen', last_name: 'King', title: 'The Shining'}
   {first_name: 'Frank', last_name: 'Herbert', title: 'Dune'}
   {first_name: 'Burne', last_name: 'Hogarth', title: 'Dynamic Anatomy'}
   {first_name: 'Margaret Wise', last_name: 'Brown', title: 'Goodnight Moon'}
   {first_name: 'Edgar Allen', last_name: 'Poe', title: 'The Tell-Tale Heart'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Learning Python'}
   {first_name: 'Mark', last_name: 'Lutz', title: 'Programming Python'}
   {first_name: 'Tom', last_name: 'Christiansen', title: 'Perl Cookbook'}
   {first_name: 'Arthur C.', last_name: 'Clarke', title: '2001: A Space Odyssey'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'Bartholomew and the Oobleck'}
   {first_name: 'Theodor Seuss', last_name: 'Geisel', title: 'The Cat in the Hat'}]
*/
let findBookAuthors = db.any('SELECT first_name, last_name, title FROM authors JOIN books ON authors.id = books.author_id')

findBookAuthors.then(books => {
  assert.deepEqual(books[0].first_name, 'John')
  assert.deepEqual(books[0].last_name, 'Worsley')
  assert.deepEqual(books[0].title, 'Practical PostgreSQL')
  assert.deepEqual(books[books.length - 1].title, 'The Cat in the Hat')
}).catch(error => {
  console.log('There is an error in findBookAuthors!!!', error)
})

/* --------End of Exercise 4---------------- */

/* -----------------------------------------
   Exercise 5
   -----------------------------------------

   Implement the function `authorIdWithTwoBooks` which returns the
   `author_id` of authors who have 2 books. (HINT: you have to use a SUBQUERY)

   @function: `authorIdWithTwoBooks`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
     [{author_id: 1809},
      {author_id: 7805}]

*/

let authorIdWithTwoBooks = db.any('SELECT author_id FROM books GROUP BY author_id HAVING COUNT(*) = 2')
authorIdWithTwoBooks.then(id => {
  assert.deepEqual(id[0].author_id, '1809')
  assert.deepEqual(id[1].author_id, '7805')
  assert.deepEqual(id.length, 2)
  // console.log(authorIdWithTwoBooks)
}).catch(error => {
  console.log('There is an error in authorIdWithTwoBooks!!!', error)
})
// Why does this return "[ anonymous { author_id: 1809 }, anonymous { author_id: 7805 } ] }"? What is the 'anonymous'? (uncomment line 152 to see it in the console.log)

/* --------End of Exercise 5---------------- */

/* -----------------------------------------
   Exercise 6
   -----------------------------------------

   Implement the function `bookTitlesWithMultipleEditions` which returns the
   `title` of books which have more than one entry in the editions table (do not use the "edition" field). (HINT: you have to use a join)

   @function: `bookTitlesWithMultipleEditions`
   @input params: None
   @output: [{title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
     [{title: 'The Shining'},
      {title: 'The Cat in the Hat'},
      {title: 'Dune'}
      {title: '2001: A Space Odyssey'}
      {title: 'The Tell-Tale Heart'}]

*/
let bookTitlesWithMultipleEditions = db.any('SELECT title, COUNT(*) FROM books JOIN editions ON editions.book_id = books.id GROUP BY books.id HAVING COUNT(*) >= 2')

bookTitlesWithMultipleEditions.then(multipleEditions => {
  assert.deepEqual(multipleEditions.length, 5)
  assert.deepEqual(multipleEditions[0].title, 'The Shining')
  // console.log(bookTitlesWithMultipleEditions)
}).catch(error => {
  console.log('There is an error in bookTitlesWithMultipleEditions!!!', error)
})

/* --------End of Exercise 6---------------- */

/* -----------------------------------------
   Exercise 7
   -----------------------------------------

   Implement the function `findStockedBooks` which returns the `title` & the
   author's `first_name` & `last_name` of all books which are stocked as
   represented in the `daily_inventory` table.

   @function: `findStockedBooks`
   @input params: None
   @output: [{first_name, last_name, title}]

   In this exercise you will ALSO have to write the assertions. For inspiration,
   look at the assertions in Exercises 1 - 3.

   Expected Result:
   [ {first_name: 'Frank',  title: 'Dune', last_name: 'Herbert'},
     {title: 'The Cat in the Hat', first_name: 'Theodor Seuss', last_name: 'Geisel'}]

*/

let findStockedBooks = db.any('SELECT DISTINCT title, authors.first_name, authors.last_name FROM books JOIN authors ON books.author_id = authors.id JOIN editions ON editions.book_id = books.id JOIN daily_inventory ON daily_inventory.isbn = editions.isbn WHERE is_stocked = TRUE')
// What's the best way to format findStockedBooks?

findStockedBooks.then(stockedBooks => {
  assert.deepEqual(stockedBooks.length, 2)
  assert.deepEqual(stockedBooks[0].first_name, 'Frank')
  assert.deepEqual(stockedBooks[0].last_name, 'Herbert')
}).catch(error => {
  console.log('There is an error in findStockedBooks!!!', error)
})

/* --------End of Exercise 7---------------- */

console.log('Reached the end!')
pg.end()
