const form = document.querySelector('form');
const chatContainer = document.getElementById('chat-container');

let loadInterval;

// Loader while fetching results
function loader(element) {
    element.textContent = 'pur';

    loadInterval = setInterval(() => {
        element.textContent += 'r';

        if (element.textContent === 'purrrr') {
            element.textContent = 'pur';
        }
    }, 300)
}

// Text type out like ChatGPT
function typeText(element, text) {
    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20)
}

// Generate uniqueID for each message
function generateID() {
    const timenow = Date.now();
    const randomNum = Math.random();
    const hexString = randomNum.toString(16);

    return `id-${timenow}-${hexString}`
}

function chatStripe(isCat, value, uniqueId) {
    return (`
        <div class="wrapper ${isCat && 'ai'}">
            <div class="chat">
                <div class="profile">
                <img
                    src=""
                    alt="${isCat ? 'bot' : 'user'}"
                />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `)
}

const handleSubmit = async (e) => {
    const data = new FormData(form);
    console.log(data);

    // User's chat stripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'), uniqueId);

    form.reset();

    // Bot's chat stripe
    const uniqueId = generateID();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);

    // Fetch data from server (Bot's response)
    const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval);
    messageDiv.innerHTML = '';

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();

        typeText(messageDiv, parsedData);
    } else {
        const err = await response.text();

        messageDiv.innerHTML = "Something went wrong";

        alert(err);
    }
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', e => {
    if (e.key === 'Spacebar') handleSubmit(e);
})


/* import { config } from 'dotenv'
config()

// Import AI API
import { Configuration, OpenAIApi } from 'openai';
import readline from "readline";

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

userInterface.prompt()
userInterface.on("line", async input => {
    const result = await openai
    .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }]
    })
    console.log(res.data.choices[0].message.content)
    userInterface.prompt()
    // .then(res => {
    //     console.log(res.data.choices[0].message.content)
    // })
})

*/