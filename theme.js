// Dark mode toggle button functionality
document.addEventListener("DOMContentLoaded", () => {
    // Create and add the dark mode toggle button dynamically
    const toggleButton = document.createElement("button");
    toggleButton.className = "theme-toggle";
    document.body.appendChild(toggleButton);

    function updateButton(isDark) {
        toggleButton.textContent = isDark ? "🌙" : "☀️";
    }

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        updateButton(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    toggleButton.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        applyTheme(!isDark);
    });

    // On page load, apply saved theme or default to light
    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme === "dark");

});