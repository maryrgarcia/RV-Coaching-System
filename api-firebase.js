const firebaseConfig = {
  apiKey: "YAIzaSyC4Uv0ngzbDDClXZ3SzZzkbL6xPoS3rQ4g",
  authDomain: "rv-coaching-system.firebaseapp.com",
  projectId: "rv-coaching-system",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// AUTH HELPERS
async function signupCreateUser(email, password, name, role='agent') {
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  const uid = cred.user.uid;
  await db.collection('users').doc(uid).set({
    email, name, role, createdAt: new Date()
  });
  return { uid, email, name, role };
}

async function loginUser(email, password) {
  const cred = await auth.signInWithEmailAndPassword(email, password);
  const uid = cred.user.uid;
  const userSnap = await db.collection('users').doc(uid).get();
  if (!userSnap.exists) throw new Error('Profile not found');
  return { uid, ...userSnap.data() };
}

async function logoutUser() {
  await auth.signOut();
}

// EVALUATIONS
async function addEvaluation(payload) {
  const ref = await db.collection('evaluations').add({...payload, createdAt: new Date()});
  return ref.id;
}

async function listEvaluations() {
  const snap = await db.collection('evaluations').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// COACHING
async function addCoaching(payload) {
  const ref = await db.collection('coaching').add({...payload, createdAt: new Date()});
  return ref.id;
}

async function listCoaching() {
  const snap = await db.collection('coaching').get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function acknowledgeCoaching(id, ackText) {
  await db.collection('coaching').doc(id).update({
    ackText, ackDate: new Date()
  });
}

// ADMIN
async function adminListAll() {
  const usersSnap = await db.collection('users').get();
  const membersSnap = await db.collection('members').get();
  const critSnap = await db.collection('criteria').get();
  return {
    users: usersSnap.docs.map(d=>({id:d.id,...d.data()})),
    members: membersSnap.docs.map(d=>({id:d.id,...d.data()})),
    criteria: critSnap.docs.map(d=>({id:d.id,...d.data()}))
  };
}
