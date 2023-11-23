/*  should return the author when given a particuar id, used helper function  */
function findAuthorById(authors, id) {
  //return author with corresponding ID
  return _findElementById(authors, id);
}

/*  should return a book when given a particular id  */
function findBookById(books, id) {
  return _findElementById(books, id);
}

/*  should return an array with two objects, borrowed and returned books   */
function partitionBooksByBorrowedStatus(books) {
  const returned = true;
  const borrowed = !returned;
  const borrowedBooks = _filterBorrowed(books, borrowed);
  const returnedBooks = _filterBorrowed(books, returned);
  //return an array that spreads both of the arrays
  return [[...borrowedBooks], [...returnedBooks]];
}

/*  should return an array for a book of all borrowers with their info and return status an limited to ten borrowers  */
function getBorrowersForBook({ borrows }, accounts) {
  const borrowers = [];
  // iterate through each record in borrows
  for (let record in borrows) {
    //find matching account using helper function
    const borrowId = borrows[record].id;
    const matchingAccount = _findElementById(accounts, borrowId);
    borrowers.push({ ...borrows[record], ...matchingAccount });
  }
  //truncate the first ten elements and return the array
  return borrowers.slice(0, 10);
}

function _findElementById(elements, id) {
  return elements.find((element) => element.id === id);
}

//Helper Function to make partitionBooksByBorrowed Status more readable and filter out a list of books based on their "returned" status
function _filterBorrowed(books, status) {
  return books.filter(({ borrows }) => status === borrows[0].returned);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
