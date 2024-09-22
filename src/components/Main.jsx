import { useState } from "react";
import BookItems from "./main/BookItems";
import { data } from "./main/data";
import SearchSort from "./main/SearchSort";

export default function Main() {
  const [books, setBooks] = useState(data);
  const [searchData, setSearchData] = useState(books);

  function onSearchHandler(value) {
    const filterBySearch = searchData.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );

    setBooks(filterBySearch);
  }

  function onSortHandler(value) {
    // Create a shallow copy of the books array to avoid mutating the original state
    let sortedBooks = [...books];

    if (value === "name_desc") {
      // Sort by title in descending order
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "name_asc") {
      // Sort by title in ascending order
      sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (value === "year_desc") {
      // Sort by publishYear in ascending order
      sortedBooks.sort((a, b) => a.publishYear - b.publishYear);
    } else if (value === "year_asc") {
      // Sort by publishYear in descending order
      sortedBooks.sort((a, b) => b.publishYear - a.publishYear);
    }

    // Update the state with the sorted array
    setBooks(sortedBooks);
  }

  return (
    <main className="my-10 lg:my-14">
      <SearchSort onSearch={onSearchHandler} onSort={onSortHandler} />
      <BookItems books={books} setBooks={setBooks} />
    </main>
  );
}
