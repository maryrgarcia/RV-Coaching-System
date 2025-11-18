const API_BASE = "PASTE_YOUR_WEB_APP_URL_HERE";

async function apiPost(endpoint, data = {}) {
    const response = await fetch(`${API_BASE}?endpoint=${endpoint}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    if (!loginBtn) return;

    loginBtn.addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        try {
            const result = await apiPost("login", { username, password });

            if (result.success) {
                localStorage.setItem("user", JSON.stringify(result.user));

                // Redirect based on role
                if (result.user.role === "admin") window.location.href = "dashboard.html";
                else if (result.user.role === "evaluator") window.location.href = "evaluations.html";
                else if (result.user.role === "agent") window.location.href = "dashboard.html";
                else alert("Unknown role");
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error(err);
            alert("Cannot connect to server. Check Apps Script deployment.");
        }
    });
});
