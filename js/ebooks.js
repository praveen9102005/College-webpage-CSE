// ebooks.js — Google Drive + Firestore (NO firebase-init.js)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

/* ---------- SAME FIREBASE CONFIG ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyBk2hRR4QzGjrXPkge_hPVEZ1Tv6jQR58A",
  authDomain: "college-webpage-eab22.firebaseapp.com",
  projectId: "college-webpage-eab22"
};

/* ---------- INIT FIREBASE ---------- */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ---------- DOM ---------- */
const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const subjectFilter = document.getElementById("subjectFilter");
const subjectList = document.getElementById("subjectList");
const noResults = document.getElementById("noResults");

let ebooks = [];

/* ---------- LOAD EBOOKS ---------- */
async function loadEbooks() {
  try {
    const snap = await getDocs(collection(db, "ebooks"));
    ebooks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Error loading documents", err);
  }
}

/* ---------- SUBJECT FILTER ---------- */
function populateSubjects() {
  const subjects = [...new Set(ebooks.map(b => b.subject || "General"))];

  subjectFilter.innerHTML =
    `<option value="">All Subjects</option>` +
    subjects.map(s => `<option value="${s}">${s}</option>`).join("");

  subjectList.innerHTML =
    `<li data-subject="" class="active">All Subjects</li>` +
    subjects.map(s => `<li data-subject="${s}">${s}</li>`).join("");

  subjectList.querySelectorAll("li").forEach(li => {
    li.onclick = () => {
      subjectList.querySelectorAll("li").forEach(x => x.classList.remove("active"));
      li.classList.add("active");
      subjectFilter.value = li.dataset.subject;
      renderBooks();
    };
  });
}

/* ---------- RENDER BOOKS ---------- */
function renderBooks() {
  const q = searchInput.value.toLowerCase();
  const subj = subjectFilter.value;

  const filtered = ebooks.filter(b =>
    (!subj || b.subject === subj) &&
    (`${b.title} ${b.author}`.toLowerCase().includes(q))
  );

  booksGrid.innerHTML = "";
  noResults.hidden = filtered.length > 0;

  filtered.forEach(b => {
    booksGrid.innerHTML += `
      <div class="book-card">
        <div class="book-title">${b.title}</div>
        <div class="book-meta">Author: ${b.author}</div>
        <div class="book-meta">Subject: ${b.subject}</div>
        <div class="book-actions">
          <a class="btn btn-download" href="${b.url}" target="_blank">Download</a>
        </div>
      </div>
    `;
  });
}

/* ---------- EVENTS ---------- */
searchInput.oninput = renderBooks;
subjectFilter.onchange = renderBooks;

/* ---------- INIT ---------- */
(async () => {
  await loadEbooks();
  populateSubjects();
  renderBooks();
})();
