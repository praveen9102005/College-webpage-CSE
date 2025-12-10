import { signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const auth = window.auth;
const db = window.db;

// ✅ STUDENT LOGIN
document.getElementById("learnerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = learnerId.value;
  const password = learnerPass.value;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", res.user.uid));

    if (snap.exists() && snap.data().role === "student") {
      window.location.href = "student-dashboard.html";
    } else {
      alert("Not Student Account");
      await signOut(auth);
    }
  } catch (err) {
    alert(err.message);
  }
});

// ✅ FACULTY LOGIN
document.getElementById("instructorForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = instructorId.value;
  const password = instructorPass.value;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", res.user.uid));

    if (snap.exists() && snap.data().role === "teacher") {
      window.location.href = "faculty-dashboard.html";
    } else {
      alert("Not Faculty Account");
      await signOut(auth);
    }
  } catch (err) {
    alert(err.message);
  }
});

