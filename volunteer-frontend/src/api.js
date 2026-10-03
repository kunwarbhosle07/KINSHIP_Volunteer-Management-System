const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}


// =========================
// AUTH
// =========================

export async function registerUser(userData) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}


export async function loginUser(userData) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}


// =========================
// EVENTS
// =========================

export async function getEvents() {
  return request("/events");
}


export async function getEvent(id) {
  return request(`/events/${id}`);
}


export async function createEvent(eventData) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}


export async function updateEvent(id, eventData) {
  return request(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}


export async function deleteEvent(id) {
  return request(`/events/${id}`, {
    method: "DELETE",
  });
}


// =========================
// SIGNUPS
// =========================

export async function signupForEvent(eventId) {
  return request(`/signups/${eventId}/signup`, {
    method: "POST",
  });
}


export async function getMyVolunteering() {
  return request("/signups/my");
}


export async function markAttendance(signupId) {
  return request(`/signups/${signupId}/attended`, {
    method: "PATCH",
  });
}