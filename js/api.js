const API_URL = "http://localhost:3000/api"; // proxy local

async function getData(action, params = {}) {
  const email = localStorage.getItem("email");
  params.email = email;
  const query = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${API_URL}?${query}`);
  return res.json();
}

async function postData(action, payload) {
  payload.email = localStorage.getItem("email");
  payload.action = action;
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
  return res.json();
}