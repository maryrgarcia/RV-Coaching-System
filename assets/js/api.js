// API BASE URL (Netlify function)
const API_BASE = "/.netlify/functions/proxy";

async function apiPost(action, payload = {}) {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload })
    });

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { success: false, message: "Bad JSON response from server" };
    }

  } catch (err) {
    return { success: false, message: String(err) };
  }
}
