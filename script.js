const allNames = ["Daniel", "Beston", "Mihail", "Ellie", "Angie", "Emma", "Nicky", "Trudy"];
const girlsNames = ["Ellie", "Angie", "Emma", "Nicky", "Trudy"];
const displaySquare = document.getElementById('displaySquare');
const shuffleAudio = document.getElementById('shuffleAudio');
const drawnNamesList = document.getElementById('drawnNamesList');
let drawnNames = []; // Array to store drawn names

// Function to display drawn names
function displayDrawnNames(drawnNames) {
    drawnNamesList.innerHTML = ''; // Clear the list
    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        li.textContent = (i + 1) + ". " + (drawnNames[i] || ''); // Add number and name
        drawnNamesList.appendChild(li);
    }
}

// Shuffle function to be called when button is pressed
function shuffleNames() {
    if (drawnNames.length >= 3) {
        alert("All names have been drawn!");
        return; // No more names can be drawn
    }

    shuffleAudio.play();
    
    const shuffleDuration = 10000; // 10 seconds shuffle duration
    const intervalTime = 100; // 50% faster shuffle pace (100ms)
    const startTime = Date.now();

    let interval = setInterval(() => {
        if (Date.now() - startTime >= shuffleDuration) {
            clearInterval(interval);
            shuffleAudio.pause();
            shuffleAudio.currentTime = 0;

            let randomName = selectWeightedName();

            // Ensure no duplicates
            while (drawnNames.includes(randomName)) {
                randomName = selectWeightedName();
            }

            // Display the final name in the square and add to the drawn names list
            displaySquare.textContent = randomName;
            drawnNames.push(randomName);

            // Update the drawn names list
            displayDrawnNames(drawnNames);

            // Disable the button if 3 names have been drawn
            if (drawnNames.length >= 3) {
                document.querySelector('button').disabled = true;
                showRefreshButton(); // Show the "Draw Again" button
            }
            return;
        }

        // Shuffle the names from allNames and display them in the square during the shuffle period
        let randomName = allNames[Math.floor(Math.random() * allNames.length)];
        displaySquare.textContent = randomName;
    }, intervalTime);
}

// Function to select a weighted name (Emma has a 20% higher chance)
function selectWeightedName() {
    const weightedNames = [];

    // Adding "Emma" 20% extra (12 out of 60)
    for (let i = 0; i < 24; i++) {
        weightedNames.push("Emma");
    }

    // Adding other names equally (each girl gets 12 chances to balance the total to 60)
    for (let name of girlsNames) {
        if (name !== "Emma") {
            for (let i = 0; i < 12; i++) {
                weightedNames.push(name);
            }
        }
    }

    // Select a random name from the weighted array
    return weightedNames[Math.floor(Math.random() * weightedNames.length)];
}

// Function to show the "Draw Again" button after all names are drawn
function showRefreshButton() {
    const refreshButton = document.createElement('button');
    refreshButton.id = 'refreshButton';
    refreshButton.textContent = "Draw Again";
    document.body.appendChild(refreshButton); // Append the button to the body

    // Add an event listener to refresh the page when the button is clicked
    refreshButton.addEventListener('click', () => {
        window.location.reload(); // Reload the page
    });

    refreshButton.style.display = 'block'; // Make the button visible
}
