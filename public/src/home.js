//helper function to easily count up any type of item array based on the length of said array
function arrayItemCount(item) {
  return item.length;
}

/*  should return the total number of books, should return zero if array is empty  */
function getTotalBooksCount(books, title) {
  return arrayItemCount(books);
}

/*  should return the total number of accounts, should return zero if the array is empty  */
function getTotalAccountsCount(accounts, id) {
  return arrayItemCount(accounts);
}

/* should return the total number of books currently borrowed  */
function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, { borrows }) => {
    const mostRecent = borrows[0];
    if (!mostRecent.returned) borrowCount++;
    return borrowCount;
  }, 0);
}

/*  should return an ordered list of top five most common genres  */
function getMostCommonGenres(books) {
  const genresCount = {};

  books.forEach(({ genre }) => {
    genresCount[genre] = (genresCount[genre] || 0) + 1;
  });

  const sortedGenres = Object.keys(genresCount)
    .sort((a, b) => genresCount[b] - genresCount[a])
    .slice(0, 5);

  return sortedGenres.map((genre) => ({
    name: genre,
    count: genresCount[genre],
  }));
}

/*  should return an ordered list of the top five most popular books  */
function getMostPopularBooks(books) {
  const booksCount = {};

  books.forEach(({ title, borrows }) => {
    booksCount[title] = borrows.length;
  });

  const sortedBooks = Object.keys(booksCount)
    .map((title) => ({ name: title, count: booksCount[title] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedBooks;
}

/*  should return an ordered list of the top five most popular authors  */

function getMostPopularAuthors(books, authors) {
  const authorCounts = {};

  books.forEach(({ authorId, borrows }) => {
    if (!authorCounts[authorId]) {
      const author = authors.find((author) => author.id === authorId);
      authorCounts[authorId] = {
        name: `${author.name.first} ${author.name.last}`,
        count: 0,
      };
    }
    authorCounts[authorId].count += borrows.length;
  });

  return Object.values(authorCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
