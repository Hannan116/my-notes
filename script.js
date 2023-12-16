const generateNotes = document.querySelector(".btn-notes");
const notesContainer = document.querySelector(".notes-container");

// Function to save notes to local storage
function saveToLocalStorage() {
  const savedNotes = [];
  const notes = document.querySelectorAll(".input-box");
  notes.forEach((note) => {
    savedNotes.push(note.innerHTML);
  });
  localStorage.setItem("notes", JSON.stringify(savedNotes));
}

// Function to load notes from local storage
function loadFromLocalStorage() {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = ""; // Clear the container before adding saved notes
  savedNotes.forEach((noteText) => {
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerHTML = noteText;

    let deleteImg = document.createElement("img");
    deleteImg.src = "images/delete.png";
    inputBox.appendChild(deleteImg);

    notesContainer.appendChild(inputBox);
  });
}

// Event listener for creating notes
generateNotes.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");

  let deleteImg = document.createElement("img");
  deleteImg.src = "images/delete.png";
  inputBox.appendChild(deleteImg);

  notesContainer.appendChild(inputBox);

  // Save notes to local storage after creating a new note
  saveToLocalStorage();
});

// Event listener for deleting notes
notesContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    const inputBox = event.target.parentElement;
    inputBox.remove();

    // Save notes to local storage after deleting a note
    saveToLocalStorage();
  }
});

// Load saved notes from local storage when the page loads
window.addEventListener("load", loadFromLocalStorage);
