document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;

  const resp = await API.get("init", { email });

  if (resp.erro) {
    document.getElementById("erro").innerText = resp.erro;
  } else {
    localStorage.setItem("email", email);
    window.location.href = "dashboard.html";
  }
});