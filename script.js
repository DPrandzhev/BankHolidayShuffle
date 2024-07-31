const allNames = ["Daniel", "Beston", "Mihail", "Ellie", "Angie", "Emma", "Nicky", "Trudy"];
const girlsNames = ["Ellie", "Angie", "Emma", "Nicky", "Trudy"];
const displaySquare = document.getElementById('displaySquare');
const shuffleAudio = document.getElementById('shuffleAudio');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleNames() {
    shuffleAudio.play();
    
    const shuffleDuration = 24000; // Duration of shuffling in milliseconds
    const intervalTime = 60; // Interval time in milliseconds
    const startTime = Date.now();

    const interval = setInterval(() => {
        if (Date.now() - startTime > shuffleDuration) {
            clearInterval(interval);
            shuffleAudio.pause();
            shuffleAudio.currentTime = 0;
            const selectedName = selectWeightedName();
            displaySquare.textContent = selectedName;
            return;
        }
        const randomName = allNames[Math.floor(Math.random() * allNames.length)];
        displaySquare.textContent = randomName;
    }, intervalTime);
}

function selectWeightedName() {
    const weightedNames = [];
    
    // Adding "Emma" 70% of the time
    for (let i = 0; i < 70; i++) {
        weightedNames.push("Emma");
    }
    
    // Adding other names 30% of the time
    for (let name of girlsNames) {
        if (name !== "Emma") {
            weightedNames.push(name);
        }
    }
    
    // Select a random name from the weighted array
    return weightedNames[Math.floor(Math.random() * weightedNames.length)];
}
