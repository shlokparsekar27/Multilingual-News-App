# ZapNews - Multilingual News Summarizer

A dynamic web application that allows users to browse news by category and channel, get AI-powered summaries of articles, and translate those summaries via Google Translate.

---

## Project Overview

ZapNews provides a streamlined way to consume news from various sources. It fetches real-time news articles via RSS feeds, leverages the **Gemini API** for concise, numbered bullet-point summaries, and offers a convenient way to translate these summaries using Google Translate. The application features a clean, responsive user interface built with CSS.

---

## Tech Stack

* **Frontend:**
    * HTML
    * CSS
    * JavaScript
    * **Tailwind CSS** (for responsive and utility-first styling)

* **Backend/API Proxy:**
    * **PHP** (acts as a server-side proxy to securely handle API requests to the Gemini API and bypass CORS restrictions)

* **APIs & Services:**
    * **RSS2JSON API** (for converting RSS feeds into JSON data)
    * **Gemini API** (for generating AI-powered news summaries)
    * **Google Translate** (external service for summary translation)

---

## Features

* **Dynamic News Categories:** Browse news organized by categories like World, Indian, and Regional news, further broken down by language.
* **Channel Selection:** Select specific news channels within each category and language.
* **Real-time News Feeds:** Fetches the latest articles from configured RSS feeds.
* **AI-Powered Summarization:**
    * Get concise, accurate summaries of news articles using the **Gemini API**.
    * Summaries are presented as **numbered bullet points** with clear line breaks for readability.
    * Designed to provide accurate information with a minimum of 5-7 key points.
* **External Translation:** A dedicated "Translate" button opens the summary in Google Translate in a new tab for easy translation into multiple languages.
* **Light and Dark Theme:** Users can toggle between a light and a dark theme for comfortable reading.
* **Responsive UI:** Clean and adaptive design ensures a good user experience across various devices.

---

## How to Set Up and Use

To run ZapNews locally, you'll need a PHP environment to host the proxy script.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd ZapNews
    ```
    *(Replace `<your-repository-url>` with the actual URL of your GitHub repository.)*

2.  **Obtain a Gemini API Key:**
    * Go to the [Google AI Studio](https://aistudio.google.com/app/apikey) or Google Cloud Console.
    * Generate a new API key for the Gemini API.

3.  **Configure the PHP Proxy:**
    * Create a file named `config.php` in the root of your project.
    * Open `config.php` and add your Gemini API key:
        ```php
        <?php
        $apiKey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
        ?>
        ```
    * Ensure that `config.php` is added to your `.gitignore` file to prevent accidental exposure of your API key.

4.  **Start a PHP Development Server:**
    * Open your terminal or command prompt.
    * Navigate to the root directory of the cloned project (where `index.html` and `gemini_proxy.php` are located).
    * Start the PHP built-in web server:
        ```bash
        php -S localhost:8000
        ```
        (You can use a different port if 8000 is occupied, e.g., `localhost:8080`).

5.  **Access the Application:**
    * Open your web browser.
    * Go to `http://localhost:8000/index.html` (or the port you chose).

6.  **Use the App:**
    * Browse news categories and languages.
    * Select a news channel to view the latest articles.
    * Click the "Summarize" button on any news article to get an AI-generated summary on a new page.
    * On the summary page, click the "Translate" button to open the summary in Google Translate.
    * Toggle the theme using the ☀️/🌙 button in the top right.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## Contribution

Feel free to fork, clone, or contribute to this project. Any suggestions, bug reports, or improvements are always welcome!
