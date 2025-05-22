// Uses `channels` and `parentMap` from channels.js
// Assuming channels.js and rssFeeds.js are loaded via <script type="module"> or globally available

// Navigate to a view by setting hash
function navigateTo(view, param) {
    let newHash = "";
    if (view === "languages") {
        newHash = "#languages";
        showLanguages(false);
    } else if (view === "indianLanguages") {
        newHash = "#indianLanguages";
        showIndianLanguages(false);
    } else if (view === "regionalLanguages") {
        newHash = "#regionalLanguages";
        showRegionalLanguages(false);
    } else if (view === "channels" && param) {
        newHash = `#channels-${param}`;
        showChannels(param, false);
    } else if (view === "groupChannels" && param) {
        newHash = `#groupChannels-${param}`;
        showGroupChannels(param, false);
    } else if (view === "channelNews" && param) {
        newHash = `#channelNews-${param}`;
        selectChannel(param, false);
    } else {
        newHash = "#categories";
        showMainCategories(false);
    }
    if (location.hash !== newHash) {
        location.hash = newHash;
    }
}

// Listen for hash changes and show correct view
window.onhashchange = function () {
    const hash = location.hash.slice(1);

    if (!hash || hash === "categories") {
        showMainCategories(false);
    } else if (hash === "languages") {
        showLanguages(false);
    } else if (hash === "indianLanguages") {
        showIndianLanguages(false);
    } else if (hash === "regionalLanguages") {
        showRegionalLanguages(false);
    } else if (hash.startsWith("channels-")) {
        const lang = hash.split("-")[1];
        showChannels(lang, false);
    } else if (hash.startsWith("groupChannels-")) {
        const group = hash.split("-")[1];
        showGroupChannels(group, false);
    } else if (hash.startsWith("channelNews-")) {
        const channel = hash.split("-")[1];
        selectChannel(channel, false);
    } else {
        showMainCategories(false);
    }
};

function showLanguages() {
    const languages = ["World News", "Indian News", "Regional News"];
    const grid = document.getElementById("dynamic-grid");
    const title = document.getElementById("dynamic-title");
    title.textContent = "Select Your News Category";
    grid.innerHTML = "";

    languages.forEach(language => {
        const div = document.createElement("div");
        div.className = "channel-grid p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"; // Tailwind classes
        div.innerHTML = `<div class="channel-title text-xl font-semibold text-gray-800">${language}</div>`; // Tailwind classes
        div.onclick = () => {
            if (language === "Regional News") {
                navigateTo("regionalLanguages");
            } else if (language === "Indian News") {
                navigateTo("indianLanguages");
            } else {
                selectLanguage(language.toLowerCase().split(" ")[0]);
            }
        };
        grid.appendChild(div);
    });
}

function showIndianLanguages() {
    const indianLangMap = {
        english: "indian_e",
        hindi: "indian_h"
    };
    const regionals = ["English", "Hindi"];
    const grid = document.getElementById("dynamic-grid");
    const title = document.getElementById("dynamic-title");
    title.textContent = "Select Indian Language";
    grid.innerHTML = "";

    regionals.forEach(language => {
        const div = document.createElement("div");
        div.className = "channel-card p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"; // Tailwind classes
        div.innerHTML = `<div class="channel-title text-xl font-semibold text-gray-800">${language}</div>`; // Tailwind classes
        div.onclick = () => selectLanguage(indianLangMap[language.toLowerCase()]);
        grid.appendChild(div);
    });
}

function showRegionalLanguages() {
    const regionals = ["Goan", "Marathi", "Kannada", "Tamil"];
    const grid = document.getElementById("dynamic-grid");
    const title = document.getElementById("dynamic-title");
    title.textContent = "Select Regional Language";
    grid.innerHTML = "";

    regionals.forEach(language => {
        const div = document.createElement("div");
        div.className = "channel-card p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"; // Tailwind classes
        div.innerHTML = `<div class="channel-title text-xl font-semibold text-gray-800">${language}</div>`; // Tailwind classes
        div.onclick = () => navigateTo("channels", language.toLowerCase());
        grid.appendChild(div);
    });
}

function showChannels(lang) {
    const grid = document.getElementById("dynamic-grid");
    const title = document.getElementById("dynamic-title");
    title.textContent = `Select Channel (${lang.charAt(0).toUpperCase() + lang.slice(1)})`;
    grid.innerHTML = "";

    const selectedChannels = channels[lang] || [];
    selectedChannels.forEach(channel => {
        const div = document.createElement("div");
        div.className = "channel-card p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"; // Tailwind classes
        div.innerHTML = `<div class="channel-title text-xl font-semibold text-gray-800">${channel}</div>`; // Tailwind classes
        div.onclick = () => navigateTo("channelNews", channel);
        grid.appendChild(div);
    });
}

function selectLanguage(lang) {
    localStorage.setItem("selectedLanguage", lang);
    navigateTo("channels", lang);
}

function showMainCategories() {
    const grid = document.getElementById("dynamic-grid");
    const title = document.getElementById("dynamic-title");
    title.textContent = "News Categories";
    grid.innerHTML = "";

    const categories = {
        world: "World News",
        indian: "Indian News",
        regional: "Regional News"
    };

    Object.entries(categories).forEach(([key, label]) => {
        const div = document.createElement("div");
        div.className = "channel-card p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"; // Tailwind classes
        div.innerHTML = `<div class="channel-title text-xl font-semibold text-gray-800">${label}</div>`; // Tailwind classes
        div.onclick = () => {
            if (key === "world") {
                navigateTo("groupChannels", "world");
            } else if (key === "indian") {
                navigateTo("indianLanguages");
            } else if (key === "regional") {
                navigateTo("regionalLanguages");
            }
        };
        grid.appendChild(div);
    });
}

function showGroupChannels(group) {
    const grid = document.getElementById("dynamic-grid");
    const title = document.getElementById("dynamic-title");
    title.textContent = `Channels - ${group.charAt(0).toUpperCase() + group.slice(1)}`; // Capitalize group name
    grid.innerHTML = "";

    if (!channels[group]) {
        grid.innerHTML = "<p class='text-gray-600 text-center'>No channels found for this category.</p>"; // Tailwind classes
        return;
    }

    channels[group].forEach(channel => {
        const div = document.createElement("div");
        div.className = "channel-card p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition-colors duration-200"; // Tailwind classes
        div.textContent = channel;
        div.onclick = () => navigateTo("channelNews", channel);
        grid.appendChild(div);
    });
}

function selectChannel(channel) {
    const grid = document.getElementById("dynamic-grid");
    const title = document.getElementById("dynamic-title");

    title.textContent = `Top News - ${channel}`;
    grid.innerHTML = `<div class="loader text-center text-blue-500 font-semibold text-lg mt-8">Loading news...</div>`; // Tailwind classes

    const rssUrl = rssFeeds[channel];
    if (!rssUrl) {
        grid.innerHTML = `<p class="text-red-500 text-center mt-8">No RSS feed found for ${channel}.</p>`; // Tailwind classes
        return;
    }

    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            grid.innerHTML = "";

            if (!data.items || data.items.length === 0) {
                grid.innerHTML = `<p class="text-gray-600 text-center mt-8">No news found for ${channel}.</p>`; // Tailwind classes
                return;
            }

            data.items.slice(0, 10).forEach(item => {
                const div = document.createElement("div");
                div.className = "channel-card p-6 bg-white rounded-xl shadow-md flex flex-col justify-between"; // Tailwind classes
                div.innerHTML = `
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">${item.title}</h3>
                    <p class="text-gray-700 text-sm mb-4">${item.description.split(" ").slice(0, 40).join(" ")}...</p>
                    <div class="flex justify-between items-center mt-auto">
                        <a href="${item.link}" target="_blank" class="channel-card-read text-blue-600 hover:underline font-medium">Read Full</a>
                        <button class="summarize-toggle bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200" data-full="${item.description.replace(/"/g, "'")}">Summarize</button>
                    </div>
                `;
                grid.appendChild(div);
            });

            // Attach summarize event handlers
            document.querySelectorAll(".summarize-toggle").forEach(el => {
                el.onclick = async () => {
                    const fullText = el.getAttribute("data-full");
                    el.textContent = "Summarizing..."; // Provide feedback
                    el.disabled = true; // Disable button during summarization

                    try {
                        const summary = await summarizeWithGemini(fullText);
                        localStorage.setItem("currentNewsSummary", summary); // Store summary in localStorage
                        window.location.href = "summary.html"; // Redirect to summary page
                    } catch (err) {
                        console.error("Error summarizing:", err);
                        el.textContent = "Error";
                        el.disabled = false; // Re-enable button on error
                    }
                };
            });
        })
        .catch(err => {
            console.error(err);
            grid.innerHTML = `<p class="text-red-500 text-center mt-8">Error loading news. Please try again later.</p>`; // Tailwind classes
        });
}

// Summarization function using Gemini API via PHP proxy
async function summarizeWithGemini(text) {
    const payload = {
        contents: [
            {
                parts: [
                    {
                        // Modified prompt to explicitly ask for bullet points with line breaks
                        text: `Summarize the key points of this news article in a bulleted list using numbers (1 , 2 , 3 ...etc) to display the bullets,
                        make sure that after one point you leave a line and the display the next point
                        and also make sure that the information provided is accurate and also explain with minimum 5-7 bullet points:\n\n${text}`
                    }
                ]
            }
        ]
    };

    const response = await fetch("gemini_proxy.php", { // Request to your PHP proxy
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
    } else {
        console.error("Error from Gemini API or proxy:", result);
        // If the proxy returns an error, it will be in result.error and result.details
        if (result.error && result.details) {
            throw new Error(`Proxy Error: ${result.error} - Details: ${JSON.stringify(result.details)}`);
        }
        throw new Error("Summary not available from API.");
    }
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the main page (index.html or similar)
    // and not on the summary.html page
    if (!window.location.pathname.includes("summary.html")) {
        // Initialize the main news categories view
        if (!location.hash) {
            location.hash = "#categories";
        }
        window.dispatchEvent(new Event('hashchange')); // Trigger hashchange to load initial view
    }
});