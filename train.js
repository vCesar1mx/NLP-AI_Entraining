
// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
const { NlpManager } = require("node-nlp");
// Creating new Instance of NlpManager class.
const manager = new NlpManager({ languages: ["es"] });
const fs = require("fs");
// Let's read all our intents files in the folder intents
const files = fs.readdirSync("./intents");
var textfile = 'questions.txt';
var text = fs.readFileSync(textfile).toString();
fs.writeFileSync("./questions.txt", '', 'utf8');
for (const file of files) {
    let data = fs.readFileSync(`./intents/${file}`);
    data = JSON.parse(data);
    const intent = file.replace(".json", "");
    fs.appendFileSync('questions.txt', data.questions.toString())
    for (const question of data.questions) {
        manager.addDocument("es", question, intent);
    }
    for (const answer of data.answers) {
        manager.addAnswer("es", intent, answer);
    }
}

async function train_save() {
    await manager.train();
    manager.save();
}

train_save();

