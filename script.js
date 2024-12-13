let votingStarted = false; // Voting starts only when EVA is entered
let votes = [0, 0, 0, 0]; // Array to store votes for each candidate
let voterVoted = false; // Tracks if a voter has already voted
let countdown; // Timer variable for the 6-hour countdown
let timeLeft = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Function to start voting with EVA code
function startVoting() {
    let evaCode = document.getElementById('start-input').value.trim(); // Get the EVA code input
    if (evaCode === 'EVA') { // Check if the EVA code matches
        alert("ভোটিং শুরু হয়েছে!");
        votingStarted = true;
        document.getElementById("start-voting").disabled = true; // Disable the Start Voting button
        document.getElementById("start-input").disabled = true; // Disable the EVA input field
        startCountdown(); // Start the 6-hour timer
    } else {
        alert("সঠিক EVA কোড লিখুন!"); // Alert for incorrect EVA code
    }
}

// Voting function for a specific candidate
function vote(candidateIndex) {
    if (!votingStarted) {
        alert("ভোটিং এখনও শুরু হয়নি!"); // If voting hasn't started
        return;
    }

    if (voterVoted) {
        alert("আপনি ইতিমধ্যে ভোট দিয়েছেন!"); // Prevent the voter from voting again
        return;
    }

    // Increment vote count for the selected candidate
    votes[candidateIndex]++;
    document.getElementById(`votes-person${candidateIndex + 1}`).innerText = `ভোট: ${votes[candidateIndex]}`;
    voterVoted = true; // Mark that the voter has voted

    checkForWinner(); // Check if any candidate has reached 200 votes
}

// Check for the winner
function checkForWinner() {
    let winnerIndex = votes.findIndex(vote => vote >= 200); // Find if any candidate has 200 or more votes
    if (winnerIndex !== -1) {
        announceWinner(winnerIndex); // Announce the winner
    }
}

// Announce the winner
function announceWinner(winnerIndex) {
    votingStarted = false; // Stop voting
    clearInterval(countdown); // Stop the timer
    document.getElementById("winner").style.display = "block"; // Show the winner section
    document.querySelector("#winner .winner-details img").src = `person${winnerIndex + 1}.jpg`; // Update winner image
    document.querySelector("#winner .winner-details h3").innerText = `প্রার্থী: Person ${winnerIndex + 1}`;
    document.querySelector("#winner .winner-details p").innerText = `ভোট: ${votes[winnerIndex]}`;
    alert(`বিজয়ী ঘোষণা হয়েছে: Person ${winnerIndex + 1}!`);
}

// Countdown timer for 6 hours
function startCountdown() {
    const countdownElement = document.querySelector(".countdown");
    countdown = setInterval(() => {
        timeLeft -= 1000; // Decrease 1 second
        let hours = Math.floor(timeLeft / (60 * 60 * 1000));
        let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        let seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
        countdownElement.innerText = `সময় বাকি: ${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endVoting(); // End voting when timer reaches 0
        }
    }, 1000);
}

// End voting after 6 hours
function endVoting() {
    votingStarted = false; // Stop voting
    alert("ভোটিং সময় শেষ হয়েছে! বিজয়ী নির্ধারণ হচ্ছে...");
    checkForWinner(); // Check if there's a winner after the timer ends
}
