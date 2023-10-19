const express = require("express");
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const cors = require('cors')

const app = express();
app.use(cors())

// dotenv
require('dotenv').config()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Import functions
// 1. Consult lawyer function
app.get('/', (req, res) => {
    res.send("welcome to virtual legalist")
})

app.post("/try", async (req, res) => {

    const configuration = new Configuration({
        apiKey: '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',
    });

    const openai = new OpenAIApi(configuration)
    const { casecategory, casedescription } = req.body

    // Create the prompt
    const prompt = `I have a ${casecategory} case . Here's the description of the case:\n\n${casedescription}\n\nProvide legal advice using 
   Zimbabwe constituency and a quote and reference of two or three fixious cases, case outcome and consitution for the decision within that category? Make it detailed and The response must be formatted well in html formatted with paragraph tags`;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 3000
        })

        res.json(completion.data.choices[0].text)

    } catch (e) {
        console.log(e)
    }
});

app.listen(process.env.PORT , () => {
    console.log(`Virtual legalist up and running on port ${process.env.PORT}`);
});