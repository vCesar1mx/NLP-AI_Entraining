
// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
const { NlpManager } = require("node-nlp");
// Creating new Instance of NlpManager class.
const manager = new NlpManager({ languages: ["es"] });
// Let's import fs module to read our json files.
const fs = require("fs");
// Let's read all our intents files in the folder intents
const files = fs.readdirSync("./intents");
// Looping through the files and Parsing the string to object and passing it to manager instance to train and process it.
var textfile = 'questions.txt';
var text = fs.readFileSync(textfile).toString();

for (const file of files) {
    let data = fs.readFileSync(`./intents/${file}`);
    data = JSON.parse(data);
    const intent = file.replace(".json", "");
    for (const question of data.questions) {
        fs.writeFileSync('questions.txt', data.questions.toString())
        manager.addDocument("es", question, intent);
        function checkifexistwordintextfile(word) {

            if (text.indexOf(word) === -1) {
                //console.log("element doesn't exist");
                //console.log(word)
            }
            else {
                fs.appendFileSync('questionsDuplicated.txt',word.toString()+'\n')
                console.log("Question duplicated in: " + word.toString());
            }
        }
        
    }
    for (const answer of data.answers) {
        manager.addAnswer("es", intent, answer);
    }
    checkifexistwordintextfile(data.questions.toString())
}

async function train_save() {
    await manager.train();
    manager.save();
}

train_save();

