# 🤖 AI Code Complexity Analyzer

A simple web tool that leverages the power of the Google Gemini API to analyze any code snippet. It automatically detects the programming language, determines the Time and Space Complexity (Big O notation), and provides a concise explanation.



---

## ✨ Features

-   🤖 **AI-Powered Analysis:** Uses Google Gemini for accurate code inspection.
-   🌐 **Language Auto-Detection:** Automatically identifies the programming language of the snippet.
-   ⏱️ **Time & Space Complexity:** Calculates Big O notation for both time and space efficiency.
-   💡 **Clear Explanations:** Provides simple, AI-generated explanations for the analysis.
-   🌙 **Modern & Responsive UI:** Sleek, dark-themed interface built with Tailwind CSS that works on all screen sizes.

---

## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI Model:** [Google Gemini API](https://ai.google.dev/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need a Google Gemini API key to use this application.
-   Get an API key at [Google AI Studio](https://makersuite.google.com/).

### Installation

1.  **Clone the repository** to your local machine:
    ```sh
    git clone [https://github.com/your-username/ai-code-analyzer.git](https://github.com/your-username/ai-code-analyzer.git)
    ```
    (Replace `your-username` with your actual GitHub username)

2.  **Navigate to the project directory**:
    ```sh
    cd ai-code-analyzer
    ```

3.  **Add your API Key**:
    -   Open the `script.js` file in a text editor.
    -   Find the following line:
        ```javascript
        const API_KEY = "YOUR_API_KEY";
        ```
    -   Replace `"YOUR_API_KEY"` with your actual Google Gemini API key.

4.  **Run the application**:
    -   Simply open the `index.html` file in your favorite web browser.

---

## usage Usage

1.  Open the `index.html` file in your browser.
2.  Paste any code snippet into the text area.
3.  Click the **"Analyze Complexity"** button.
4.  View the results that appear below, including the detected language, time complexity, space complexity, and the AI's explanation.

---

## 📄 License

This project is licensed under the MIT License.
