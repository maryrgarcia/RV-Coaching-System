const API_BASE = "https://script.google.com/macros/s/AKfycbzhxhsILqRzZiLpFndMt7-AwACI2ebYA_7cxYCNkHRXNetVzfFnDMq8RM_T7tBISRO-Mw/exec";

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
