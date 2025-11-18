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

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    if (!loginBtn) return;

    loginBtn.addEventListener("click", async () => {
        const usernameField = document.getElementById("username");
        const passwordField = document.getElementById("password");

        const username = usernameField.value.trim();
        const password = passwordField.value.trim();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        try {
            const result = await apiPost("login", { username, password });

            if (result.success) {
                localStorage.setItem("user", JSON.stringify(result.user));

                // Role-based redirect
                if (result.user.role === "admin") {
                    window.location.href = "dashboard.html";
                } else if (result.user.role === "evaluator") {
                    window.location.href = "evaluations.html";
                } else if (result.user.role === "agent") {
                    window.location.href = "dashboard.html"; // or agent-specific page
                } else {
                    alert("Unknown role");
                }
            } else {
                alert(result.message || "Invalid login");
            }
        } catch (err) {
            console.error(err);
            alert("Cannot connect to server. Check Apps Script deployment.");
        }
    });
});
