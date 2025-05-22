// translate.js
// This script handles the translation functionality for the news summary page.

document.addEventListener("DOMContentLoaded", () => {
    const translateButton = document.getElementById("translate-button");
    const summaryContentDiv = document.getElementById("summary-content"); // Need this to get the text

    // --- Debugging: Check if summaryContentDiv is found ---
    if (!summaryContentDiv) {
        console.error("Translate.js Error: 'summary-content' element not found. Translation will not work.");
        return; // Exit if the content div isn't found
    }

    if (translateButton) {
        translateButton.onclick = () => {
            // Get the text content from the summary display div
            // Use innerText for visible text, fall back to textContent
            const summaryText = summaryContentDiv.innerText || summaryContentDiv.textContent;

            // --- Debugging: Log the text being picked up ---
            console.log("Translate.js: Text retrieved for translation:", summaryText);
            console.log("Translate.js: Trimmed text:", summaryText.trim());
            console.log("Translate.js: Is text empty after trim?", summaryText.trim() === '');


            if (summaryText && summaryText.trim() !== '') {
                // Encode the summary text to be safely included in a URL
                // sl=auto: source language auto-detect
                // tl=en: target language English (user can change this on Google Translate page)
                const googleTranslateUrl = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(summaryText)}`;
                window.open(googleTranslateUrl, '_blank'); // Open in a new tab
            } else {
                // Use a console warning for better UX instead of an alert
                console.warn("Translate.js: No summary text available to translate (text was empty or just whitespace).");
            }
        };
    } else {
        console.warn("Translate.js: Translate button with ID 'translate-button' not found.");
    }
});
