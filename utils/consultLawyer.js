// Set up OpenAI API client
const openai = require('openai');

const client = new openai.OpenAIApi('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');

const consultLawyer = async (casecategory, casedescription) => {

    // Import JSONs for different case categories
    const criminalCases = require("../data/criminalCases.json");
    const civilCases = require("../data/civilCases.json");
    const appellateCases = require("../data/appellateCases.json");
    const administrativeCases = require("../data/administrativeCases.json");
    const familyLawCases = require("../data/familyLawCases.json");
    const constitutionalCases = require("../data/constitutionalCases.json");
    const laborEmploymentCases = require("../data/laborEmploymentCases.json");

    // Create the prompt
    const prompt = `I have a ${casecategory} case . Here's the description of the case:\n\n${casedescription}\n\nCan you provide legal advice using 
    Zimbabwe constituency and a quote and reference fixious case, case outcome and consitution for the decision within that category?`;

    try {
        const response = await client.completions.create({
            engine: 'davinci',
            prompt,
            maxTokens: 100,
            n: 1,
            stop: '\n',
        });

        const advice = response.choices[0].text.trim();
        return advice;
        
    } catch (error) {
        console.error('Error:', error);
        return 'An error occurred while processing your request.';
    }
};

module.exports = consultLawyer;
