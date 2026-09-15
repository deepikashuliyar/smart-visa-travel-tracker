export const calculateDaysLeft = (expiryDate) => {
    if (!expiryDate) return null;

    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const difference = expiry - today;

    return Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );
};

export const getExpiryStatus = (expiryDate) => {
    const daysLeft = calculateDaysLeft(expiryDate);

    if (daysLeft === null) {
        return "Unknown";
    }

    if (daysLeft < 0) {
        return "Expired";
    }

    if (daysLeft <= 30) {
        return "Critical";
    }

    if (daysLeft <= 60) {
        return "Warning";
    }

    if (daysLeft <= 90) {
        return "Upcoming";
    }

    return "Valid";
};

export const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};