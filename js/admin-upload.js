/* ----------------------------------------
   ADMIN UPLOAD — GOOGLE DRIVE VERSION
   NO FIREBASE STORAGE USED
   NO firebase-init.js NEEDED
----------------------------------------- */

// --------- FIREBASE IMPORTS ---------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";


// --------- FIREBASE CONFIG ---------
const firebaseConfig = {
    apiKey: "AIzaSyBk2hRR4QzGjrXPkge_hPVEZ1Tv6jQR58A",
    authDomain: "college-webpage-eab22.firebaseapp.com",
    projectId: "college-webpage-eab22",
    storageBucket: "college-webpage-eab22.firebasestorage.app",
    messagingSenderId: "558335900816",
    appId: "1:558335900816:web:c46d1d4247b2f7cb8c2c15",
    measurementId: "G-BMDQFJQHGX"
};

// --------- INITIALIZE FIREBASE ---------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// --------- DOM ELEMENTS ---------
const statusBox = document.getElementById("status");
const uploadBtn = document.getElementById("uploadBtn");


// --------- ADMIN CHECK ---------
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    statusBox.textContent = "❌ Not logged in.";
    return;
  }

  const token = await user.getIdTokenResult(true);

  if (!token.claims.admin) {
    statusBox.textContent = "❌ Access denied — You are not an admin.";
    uploadBtn.disabled = true;
    return;
  }

  statusBox.textContent = "✔ Admin Verified";
});


// --------- CONVERT GOOGLE DRIVE LINK ---------
function convertDriveLink(url) {
  const fileId = url.match(/[-\w]{25,}/);
  if (!fileId) return null;
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}


// --------- UPLOAD EBOOK METADATA ONLY ---------
uploadBtn.addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim() || "Unknown";
  const subject = document.getElementById("subject").value.trim() || "General";
  const year = document.getElementById("year").value.trim() || "Unknown";
  const driveLink = document.getElementById("drive").value.trim();

  if (!title || !driveLink) {
    alert("Enter title and Google Drive link.");
    return;
  }

  const directUrl = convertDriveLink(driveLink);
  if (!directUrl) {
    alert("Invalid Google Drive link.");
    return;
  }

  try {
    await addDoc(collection(db, "ebooks"), {
      title,
      author,
      subject,
      year,
      url: directUrl,
      createdAt: serverTimestamp(),
      uploadedBy: auth.currentUser.uid
    });

    statusBox.textContent = "✔ Ebook saved successfully!";
  } catch (err) {
    statusBox.textContent = "Error: " + err.message;
    console.error(err);
  }
});

