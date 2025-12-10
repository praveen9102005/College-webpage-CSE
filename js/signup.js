import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBk2hRR4QzGjrXPkge_hPVEZ1Tv6jQR58A",
  authDomain: "college-webpage-eab22.firebaseapp.com",
  projectId: "college-webpage-eab22",
  storageBucket: "college-webpage-eab22.firebasestorage.app",
  messagingSenderId: "558335900816",
  appId: "1:558335900816:web:c46d1d4247b2f7cb8c2c15"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ STUDENT SIGNUP
document.getElementById("studentSignupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await createUserWithEmailAndPassword(auth, semail.value, spassword.value);
    await setDoc(doc(db, "users", res.user.uid), {
      name: sname.value,
      email: semail.value,
      role: "student"
    });

    alert("Student account created!");
    window.location.href = "login.html";

  } catch (err) {
    alert(err.message);
  }
});

// ✅ FACULTY SIGNUP
document.getElementById("teacherSignupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await createUserWithEmailAndPassword(auth, temail.value, tpassword.value);
    await setDoc(doc(db, "users", res.user.uid), {
      name: tname.value,
      email: temail.value,
      role: "teacher"
    });

    alert("Faculty account created!");
    window.location.href = "login.html";

  } catch (err) {
    alert(err.message);
  }
});
