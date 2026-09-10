const GUEST_ID_KEY = "techmart_guest_id";

export const getGuestId = () => {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id =
      (typeof crypto !== "undefined" && crypto.randomUUID?.()) ||
      `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
};

// Clears the guest session id. Call after a successful login/signup once the
export const clearGuestId = () => {
  localStorage.removeItem(GUEST_ID_KEY);
};