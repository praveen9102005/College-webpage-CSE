// upload-batch.js
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json','utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'PASTE_BUCKET.appspot.com'
});

const bucket = admin.storage().bucket();
const firestore = admin.firestore();

// configure your local folder
const LOCAL_FOLDER = path.join(process.cwd(), 'to-upload'); // ./to-upload/{subject}/{files}

async function walkAndUpload(dir) {
  const items = await readdir(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const s = await stat(full);
    if (s.isDirectory()) {
      await walkAndUpload(full);
    } else if (item.toLowerCase().endsWith('.pdf')) {
      // derive subject from parent folder name
      const subject = path.basename(path.dirname(full));
      const filename = path.basename(full);
      const storagePath = `ebooks/${subject}/${Date.now()}_${filename}`;
      console.log('Uploading', full, '->', storagePath);
      await bucket.upload(full, { destination: storagePath });
      const file = bucket.file(storagePath);
      const [meta] = await file.getMetadata();
      const url = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(storagePath)}`;
      const docRef = firestore.collection('ebooks').doc();
      await docRef.set({
        title: filename.replace(/\.pdf$/i,''),
        author: 'Unknown',
        subject,
        filename,
        storagePath,
        url,
        sizeBytes: parseInt(meta.size,10),
        mimeType: meta.contentType,
        uploadedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('Saved metadata for', filename);
    }
  }
}

walkAndUpload(LOCAL_FOLDER).then(()=>console.log('Done'))
.catch(err => console.error(err));
