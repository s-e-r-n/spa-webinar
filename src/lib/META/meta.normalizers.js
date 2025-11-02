export const normalizeName = (name) => {
  return name.replace(/[ ,.'-]/g, "");
};

export const normalizeEmail = (email) => {
  return email.trim().toLowerCase();
};

export const normalizePhone = (phone) => {
  return phone.replace(/\D/g, "").trim();
};

export const normalizeCountry = () => {
  return "ch";
};
