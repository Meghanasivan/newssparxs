// Constants
const API_KEY = "499d03534f224e8890dcd1f95376001c";
const url = "https://newsapi.org/v2/everything?q=";

// Fetch News Data
async function fetchData(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  return data;
}

// Render News
function renderMain(arr) {
  let mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += `
        <div class="card">
          <a href=${arr[i].url}>
            <img src=${arr[i].urlToImage} lazy="loading" />
            <h4>${arr[i].title}</h4>
            <div class="publishbyDate">
              <p>${arr[i].source.name}</p>
              <span>•</span>
              <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
            </div>
            <div class="desc">
              ${arr[i].description}
            </div>
          </a>
        </div>`;
    }
  }
  document.querySelector("main").innerHTML = mainHTML;
}

// Search Functionality
async function Search(query) {
  const data = await fetchData(query);
  renderMain(data.articles);
}

// Event Listeners
// Desktop search
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  const data = await fetchData(query);
  renderMain(data.articles);
});

// Mobile search
document.getElementById("searchFormMobile").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInputMobile").value;
  const data = await fetchData(query);
  renderMain(data.articles);
});

// Notepad Functionality
let savedNote = ""; // Variable to store the saved note

// Toggle the notepad modal
function toggleNotepad() {
  const modal = document.getElementById("notepadModal");
  modal.classList.toggle("hidden");
  document.getElementById("notepadOptions").classList.remove("hidden");
  document.getElementById("addNoteSection").classList.add("hidden");
  document.getElementById("savedNoteSection").classList.add("hidden");
}

// Show the saved note
function showSavedNote() {
  document.getElementById("notepadOptions").classList.add("hidden");
  const savedNoteSection = document.getElementById("savedNoteSection");
  savedNoteSection.classList.remove("hidden");

  const savedNoteText = document.getElementById("savedNote");
  if (savedNote) {
    savedNoteText.textContent = savedNote;
  } else {
    savedNoteText.textContent = "No saved notes available.";
  }
}

// Add a new note
function addNewNote() {
  document.getElementById("notepadOptions").classList.add("hidden");
  const addNoteSection = document.getElementById("addNoteSection");
  addNoteSection.classList.remove("hidden");

  const currentDate = new Date().toLocaleDateString();
  document.getElementById("currentDate").textContent = currentDate;
}

// Save the note
function saveNote() {
  const noteInput = document.getElementById("noteInput").value;
  if (noteInput.trim()) {
    savedNote = noteInput;
    alert("The note is saved successfully!");
    toggleNotepad();
  } else {
    alert("Please enter a note before saving.");
  }
}

// Close the notepad modal
function closeNotepad() {
  document.getElementById("notepadModal").classList.add("hidden");
}
