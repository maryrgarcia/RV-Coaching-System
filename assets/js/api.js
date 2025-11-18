const API_BASE = "https://script.google.com/macros/s/AKfycbxsuerdXI0qdT40PbJ1fyU_i0o6QqFAL53fKMD89i7BZNo8uVv_qrQ-5t-AXOgBkXZFuQ/exec";

async function apiPost(endpoint, data = {}) {
    const response = await fetch(`${API_BASE}?endpoint=${endpoint}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return response.json();
}

async function apiGet(endpoint) {
    const response = await fetch(`${API_BASE}?endpoint=${endpoint}`, {
        method: "GET",
        mode: "cors"
    });

    return response.json();
}
