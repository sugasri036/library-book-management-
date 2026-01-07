async function loadBooks() {
  const res = await fetch("/.netlify/functions/books");
  const data = await res.json();

  const list = document.getElementById("books");
  list.innerHTML = "";

  data.forEach((book) => {
    const li = document.createElement("li");
    li.innerText = `${book.title} by ${book.author}`;
    list.appendChild(li);
  });
}
