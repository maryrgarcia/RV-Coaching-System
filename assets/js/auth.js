document.addEventListener("DOMContentLoaded", () => {
  console.log("auth.js loaded");

  const loginBtn = document.getElementById("loginBtn");
  const createBtn = document.getElementById("createAccountBtn");

  // LOGIN
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Please enter username/email and password");
        return;
      }

      const result = await apiPost("login", { email: username, password });

      console.log("Login result:", result);

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect based on role
        const role = result.user.role.toLowerCase();
        if (role === "admin") {
          window.location.href = "dashboard.html";
        } else if (role === "evaluator") {
          window.location.href = "evaluations.html";
        } else {
          window.location.href = "agent.html";
        }
      } else {
        alert(result.message);
      }
    });
  }

  // CREATE ACCOUNT
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      window.location.href = "signup.html";
    });
  }
});
