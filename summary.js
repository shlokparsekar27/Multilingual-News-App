// summary.js
// This script is responsible for retrieving and displaying the news summary
// on the dedicated summary.html page, with specific formatting.

document.addEventListener("DOMContentLoaded", () => {
    const summaryContentDiv = document.getElementById("summary-content");

    if (!summaryContentDiv) {
        console.error("Error: Could not find element with ID 'summary-content' in summary.html");
        return;
    }

    const storedSummary = localStorage.getItem("currentNewsSummary");

    if (storedSummary) {
        // Split the entire summary by newline characters and filter out empty lines
        const lines = storedSummary.split('\n').filter(line => line.trim() !== '');

        // Skip the first line (introductory sentence) and take the rest as summary points.
        const summaryPoints = lines.slice(1);

        let finalHtml = '';

        // Process and display the actual summary points as an ordered list
        if (summaryPoints.length > 0) {
            finalHtml += '<ol class="list-decimal pl-5 space-y-4">'; // Tailwind for decimal list and spacing
            summaryPoints.forEach(point => {
                // Remove any leading numbers/bullets from the point, as <ol> handles numbering
                const cleanedPoint = point.replace(/^\s*[\d\*\-\–\.]+\s*/, '').trim();
                if (cleanedPoint) {
                    finalHtml += `<li class="channel-summary">${cleanedPoint}</li>`; // Using text-gray-700 for list item text
                }
            });
            finalHtml += '</ol>';
        } else {
            // If there are no summary points after skipping the intro line,
            // display a message indicating no detailed summary is available.
            finalHtml = "<p class='channel-title'>No detailed summary available.</p>";
        }

        summaryContentDiv.innerHTML = finalHtml;

        localStorage.removeItem("currentNewsSummary");
    } else {
        summaryContentDiv.innerHTML = "<p class='channel-title'>No summary found. Please go back to the news page and try again.</p>";
    }
});
