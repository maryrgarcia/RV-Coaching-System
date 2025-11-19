function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Royal Vending Portal')
    .setFaviconUrl(''); // optional favicon
}

/* ---------- USERS / AUTH ---------- */
function signup(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const users = getSheet(ss,'Users');
  const email = payload.email;
  const name = payload.name || '';
  const pw = payload.password || '';
  const role = payload.role || 'agent';

  const data = users.getDataRange().getValues();
  for(let i=0;i<data.length;i++){ 
    if(data[i][0] === email) return { success:false, message:'User exists' }; 
  }

  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, pw);
  const hex = hash.map(b => { if(b<0)b+=256; let h=b.toString(16); return h.length===1?'0'+h:h }).join('');

  users.appendRow([email, name, hex, role, new Date()]);
  return { success:true, message:'Account created' };
}

function login(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const users = getSheet(ss,'Users');
  const data = users.getDataRange().getValues();
  const email = payload.email;
  const pw = payload.password || '';
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, pw);
  const hex = hash.map(b => { if(b<0)b+=256; let h=b.toString(16); return h.length===1?'0'+h:h }).join('');

  for(let i=0;i<data.length;i++){
    if(data[i][0]===email && String(data[i][2])===hex){
      return { success:true, user:{ email:data[i][0], name:data[i][1], role:data[i][3] } };
    }
  }
  return { success:false, message:'Invalid credentials' };
}

/* ---------- UTILITY ---------- */
function getSheet(ss,name){
  let s = ss.getSheetByName(name);
  if(!s) s = ss.insertSheet(name);
  return s;
}
