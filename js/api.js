const API_URL = "https://script.google.com/macros/s/AKfycbybPAaC_KmS38XVO1VyjCUwkh-uN7kh6O3MT49h8vtfCicp0AYegQJXBMnDTAnKtrJoyg/exec";

const API = {
  get: async function(action, params = {}) {
    const email = localStorage.getItem("email");
    params.email = email;
    const query = new URLSearchParams({ action, ...params }).toString();
    const res = await fetch(`${API_URL}?${query}`);
    return res.json();
  },
  post: async function(action, data = {}) {
    data.email = localStorage.getItem("email");
    data.action = action;
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    return res.json();
  }
};