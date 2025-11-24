// Import the functions you need from the SDKs you use
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Specific Auth functions
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc, getDocs, query } from "firebase/firestore"; // Specific Firestore functions

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4Uv0ngzbDDClXZ3SzZzkbL6xPoS3rQ4g",
  authDomain: "rv-coaching-system.firebaseapp.com",
  projectId: "rv-coaching-system",
  storageBucket: "rv-coaching-system.firebasestorage.app",
  messagingSenderId: "65883754066",
  appId: "1:65883754066:web:1ca8e6059581fb2c19198b",
  measurementId: "G-ZE6FV5E0Y2"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get service instances
const auth = getAuth(app);
const db = getFirestore(app);

// -------------------------
// AUTH HELPERS (UPDATED TO MODULAR)
// -------------------------
async function signupCreateUser(email, password, name, role = 'agent') {
  const cred = await createUserWithEmailAndPassword(auth, email, password); // Use modular function
  const uid = cred.user.uid;
  await setDoc(doc(db, 'users', uid), { // Use modular setDoc and doc
    email, name, role, createdAt: new Date()
  });
  return { uid, email, name, role };
}

async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password); // Use modular function
  const uid = cred.user.uid;
  const userSnap = await getDoc(doc(db, 'users', uid)); // Use modular getDoc and doc
  if (!userSnap.exists()) throw new Error('Profile not found');
  return { uid, ...userSnap.data() };
}

async function logoutUser() {
  await signOut(auth); // Use modular function
}

// -------------------------
// EVALUATIONS (UPDATED TO MODULAR)
// -------------------------
async function addEvaluation(payload) {
  const collectionRef = collection(db, 'evaluations'); // Get collection reference
  const docRef = await addDoc(collectionRef, { // Use modular addDoc
    ...payload,
    createdAt: new Date()
  });
  return docRef.id;
}

async function listEvaluations() {
  const collectionRef = collection(db, 'evaluations'); // Get collection reference
  const q = query(collectionRef); // For queries if needed, though getDocs works directly
  const snap = await getDocs(q); // Use modular getDocs
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// -------------------------
// COACHING (UPDATED TO MODULAR)
// -------------------------
async function addCoaching(payload) {
  const collectionRef = collection(db, 'coaching'); // Get collection reference
  const docRef = await addDoc(collectionRef, { // Use modular addDoc
    ...payload,
    createdAt: new Date()
  });
  return docRef.id;
}

async function listCoaching() {
  const collectionRef = collection(db, 'coaching'); // Get collection reference
  const q = query(collectionRef);
  const snap = await getDocs(q); // Use modular getDocs
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function acknowledgeCoaching(id, ackText) {
  const docRef = doc(db, 'coaching', id); // Get specific document reference
  await updateDoc(docRef, { // Use modular updateDoc
    ackText,
    ackDate: new Date()
  });
}

// -------------------------
// ADMIN (UPDATED TO MODULAR)
// -------------------------
async function adminListAll() {
  const usersSnap = await getDocs(collection(db, 'users'));
  const membersSnap = await getDocs(collection(db, 'members'));
  const critSnap = await getDocs(collection(db, 'criteria'));

  return {
    users: usersSnap.docs.map(d => ({ id: d.id, ...d.data() })),
    members: membersSnap.docs.map(d => ({ id: d.id, ...d.data() })),
    criteria: critSnap.docs.map(d => ({ id: d.id, ...d.data() }))
  };
}
