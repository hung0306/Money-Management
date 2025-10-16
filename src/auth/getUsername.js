export const getUsername = () => {
    try {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            return user.fullName || "Guest";
        }
        return "Guest";
    } catch (error) {
        console.error("Error parsing loggedInUser from localStorage:", error);
        return "Guest";
    }
};