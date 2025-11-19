const API_BASE = "https://script.google.com/macros/s/AKfycbzrcp42cLgTrdttpe2XQds6RoLXJAcyHQUIItt2huaV6triutQGoaQpo2RwCiK_siIlSQ/exec";

async function apiPost(endpoint, data = {}) {
    try {
        const response = await fetch(`${API_BASE}?endpoint=${endpoint}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    } catch (err) {
        console.error("API POST error:", err);
        return { success: false, message: "Request failed" };
    }
}
