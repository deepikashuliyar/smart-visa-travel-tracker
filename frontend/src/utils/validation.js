export const isValidEmail = (email) => {
    if (!email) return false;

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isRequired = (value) => {
    return value !== undefined &&
           value !== null &&
           value.toString().trim() !== "";
};

export const isValidPassword = (password) => {
    if (!password) return false;

    return password.length >= 6;
};

export const isValidDate = (date) => {
    if (!date) return false;

    return !isNaN(new Date(date).getTime());
};