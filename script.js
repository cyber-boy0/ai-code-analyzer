const analyzeBtn = document.getElementById('analyzeBtn');
const codeInput = document.getElementById('codeInput');
const resultDiv = document.getElementById('result');
const loader = document.getElementById('loader');
const analysisOutput = document.getElementById('analysisOutput');

// --- Gemini API Integration ---
const API_KEY = "YOUR_API_KEY"; // IMPORTANT: Replace with your actual Gemini API Key.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

async function analyzeCodeWithAI(code) {
    const systemPrompt = `You are an expert software engineer specializing in algorithm analysis. Analyze the following code snippet.
    Your task is to:
    1. Identify the programming language.
    2. Determine the Big O time complexity.
    3. Determine the Big O space complexity.
    4. Provide a concise, single-paragraph explanation for your analysis.
    You must respond ONLY with a valid JSON object following this exact schema:
    {
      "language": "string",
      "timeComplexity": "string",
      "spaceComplexity": "string",
      "explanation": "string"
    }`;

    const payload = {
        contents: [{ parts: [{ text: `Analyze this code: \n\n${code}` }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        generationConfig: {
            responseMimeType: "application/json",
        }
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            return JSON.parse(candidate.content.parts[0].text);
        } else {
            console.error("Invalid response structure from API:", result);
            throw new Error("Invalid response structure from API.");
        }
    } catch (error) {
        console.error("Error analyzing code:", error);
        return null;
    }
}

analyzeBtn.addEventListener('click', async () => {
    const code = codeInput.value;
    if (code.trim() === '') {
        analysisOutput.innerHTML = `<p class="text-red-400 text-center">Please enter some code to analyze.</p>`;
        resultDiv.classList.remove('hidden');
        return;
    }

    resultDiv.classList.remove('hidden');
    loader.classList.remove('hidden');
    analysisOutput.innerHTML = '';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';

    const analysis = await analyzeCodeWithAI(code);
    
    loader.classList.add('hidden');
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze Complexity';

    if (analysis) {
        analysisOutput.innerHTML = `
            <div class="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <span class="text-lg font-medium text-gray-300">Detected Language:</span>
                <span class="text-lg font-bold text-purple-400 px-3 py-1 bg-purple-900/50 rounded-full">${analysis.language}</span>
            </div>
            <div class="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <span class="text-lg font-medium text-gray-300">Time Complexity:</span>
                <span class="text-lg font-bold text-green-400 px-3 py-1 bg-green-900/50 rounded-full">${analysis.timeComplexity}</span>
            </div>
            <div class="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <span class="text-lg font-medium text-gray-300">Space Complexity:</span>
                <span class="text-lg font-bold text-yellow-400 px-3 py-1 bg-yellow-900/50 rounded-full">${analysis.spaceComplexity}</span>
            </div>
            <div class="mt-4 bg-gray-800 p-4 rounded-lg">
                 <h3 class="text-lg font-semibold text-cyan-400 mb-2">Explanation</h3>
                 <p class="text-gray-400">${analysis.explanation}</p>
            </div>
        `;
    } else {
         analysisOutput.innerHTML = `<p class="text-red-400 text-center">Could not analyze the code. The AI model may be temporarily unavailable or the code may be ambiguous. Please try again.</p>`;
    }
});