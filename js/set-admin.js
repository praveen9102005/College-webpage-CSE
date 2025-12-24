// set-admin.js (Node Script)
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// ✅ Load service account key (must be inside the same folder as this file)
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ ERROR: serviceAccountKey.json not found in /js folder!");
  console.error("Place your key here:");
  console.error("College-webpage-CSE/js/serviceAccountKey.json");
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

// ✅ Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**
 * Set admin privileges to a user.
 */
async function setAdmin(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`✅ SUCCESS: Admin privilege granted to user: ${uid}`);
  } catch (error) {
    console.error("❌ Failed to set admin:", error.message);
  }
}

// Read UID from command line
const uid = process.argv[2];

if (!uid) {
  console.log("❌ Usage: node set-admin.js <USER_UID>");
  process.exit(1);
}

// Run the function
setAdmin(uid);
