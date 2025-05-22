// Game state
let currentScene = "start";
let inventory = [];

// Scenes (expanded story)
const scenes = {
    start: {
        text: "You wake up in a dark forest. There are two paths ahead.",
        image: "images/forest.jpg",
        choices: [
            { text: "Go left", nextScene: "leftPath" },
            { text: "Go right", nextScene: "rightPath" },
            { text: "Search nearby bushes", nextScene: "findKnife" }
        ]
    },
    leftPath: {
        text: "You find a river. Do you swim across or look for a bridge?",
        image: "images/river.jpg",
        choices: [
            { text: "Swim across", nextScene: "swimDeath" },
            { text: "Search for a bridge", nextScene: "bridgeFound" },
            { text: "Use a raft (if you have one)", nextScene: "useRaft", requires: "raft" }
        ]
    },
    rightPath: {
        text: "You encounter a wild beast! Do you fight or run?",
        image: "images/beast.jpg",
        choices: [
            { text: "Fight", nextScene: inventory.includes("knife") ? "killBeast" : "fightBeast" },
            { text: "Run away", nextScene: "runAway" }
        ]
    },
    findKnife: {
        text: "You found a rusty knife in the bushes! It might be useful.",
        image: "images/forest.jpg",
        onEnter: () => inventory.push("knife"),
        choices: [
            { text: "Go back to the paths", nextScene: "start" }
        ]
    },
    useRaft: {
        text: "You use the raft and safely cross the river!",
        image: "images/river.jpg",
        onEnter: () => inventory = inventory.filter(item => item !== "raft"),
        choices: [
            { text: "Continue to the village", nextScene: "village" }
        ]
    },
    village: {
        text: "You arrive at a peaceful village. You win!",
        image: "images/village.jpg",
        choices: []
    },
    // ... (add more scenes)
};

// Update the game display
function updateScene() {
    const scene = scenes[currentScene];
    
    // Update story text
    document.getElementById("story").innerHTML = `<p>${scene.text}</p>`;
    
    // Update image
    const sceneImage = document.getElementById("scene-image");
    sceneImage.innerHTML = scene.image ? `<img src="${scene.image}" alt="Scene">` : "";
    
    // Update choices
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    
    scene.choices.forEach(choice => {
        // Check if the choice requires an item
        const hasItem = !choice.requires || inventory.includes(choice.requires);
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.disabled = !hasItem;
        button.onclick = () => {
            currentScene = choice.nextScene;
            if (scene.onEnter) scene.onEnter(); // Trigger special events
            updateScene();
        };
        choicesDiv.appendChild(button);
    });
    
    // Update inventory
    updateInventory();
}

// Update inventory display
function updateInventory() {
    const inventoryList = document.getElementById("inventory-items");
    inventoryList.innerHTML = "";
    inventory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// Start the game
updateScene();
