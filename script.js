// Game state
let currentScene = "start";

// Scenes (story branches)
const scenes = {
    start: {
        text: "You wake up in a dark forest. There are two paths ahead.",
        choices: [
            { text: "Go left", nextScene: "leftPath" },
            { text: "Go right", nextScene: "rightPath" }
        ]
    },
    leftPath: {
        text: "You find a river. Do you swim across or look for a bridge?",
        choices: [
            { text: "Swim across", nextScene: "swimDeath" },
            { text: "Search for a bridge", nextScene: "bridgeFound" }
        ]
    },
    rightPath: {
        text: "You encounter a wild beast! Do you fight or run?",
        choices: [
            { text: "Fight", nextScene: "fightBeast" },
            { text: "Run away", nextScene: "runAway" }
        ]
    },
    swimDeath: {
        text: "The current was too strong. You drowned. GAME OVER.",
        choices: []
    },
    bridgeFound: {
        text: "You found a hidden bridge and safely crossed! You win!",
        choices: []
    },
    fightBeast: {
        text: "The beast was too strong. GAME OVER.",
        choices: []
    },
    runAway: {
        text: "You escaped safely and found a village. You win!",
        choices: []
    }
};

// Update the game display
function updateScene() {
    const scene = scenes[currentScene];
    document.getElementById("story").innerHTML = `<p>${scene.text}</p>`;
    
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    
    scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => {
            currentScene = choice.nextScene;
            updateScene();
        };
        choicesDiv.appendChild(button);
    });
}

// Start the game
updateScene();
