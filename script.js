let votes = [0, 0, 0, 0, 0]; // Array to store votes for 5 persons
let votingStarted = false; // Flag to track if voting has started
let votingStartedAt = null; // Store the time when voting started
let winnerList = []; // To store winner details

// Define the Admin username
const adminUsername = "yourAdminUsername"; // Replace with your admin username
let currentUser = ""; // Variable to store the current user, should be set based on login

// Voting function to add votes
function vote(person) {
    if (!votingStarted) {
        alert("ভোটিং শুরু হয়নি। দয়া করে ভোটিং শুরু করুন।");
        return;
    }
    let currentTime = Date.now();
    let timeElapsed = currentTime - votingStartedAt;
    let hoursPassed = timeElapsed / (1000 * 60 * 60); // Time passed in hours

    // If 6 hours have passed, reset votes
    if (hoursPassed >= 6) {
        resetVotes();
    }

    // Increment vote for selected person
    votes[person]++;
    document.getElementById(`votes-person${person + 1}`).innerText = `ভোট: ${votes[person]}`;

    // Check for winner
    checkWinner();
}

// Function to check if a winner has reached 200 votes
function checkWinner() {
    for (let i = 0; i < votes.length; i++) {
        if (votes[i] >= 200) {
            announceWinner(i);
            break;
        }
    }
}

// Function to announce the winner
function announceWinner(winnerIndex) {
    let winnerName = `Person ${winnerIndex + 1}`;
    let winnerDate = new Date().toLocaleDateString('bn-BD');
    winnerList.push({ name: winnerName, date: winnerDate, votes: votes[winnerIndex] });

    document.getElementById('winner').style.display = 'block';
    document.getElementById('winner').querySelector('h3').innerText = `বিজয়ী: ${winnerName}`;
    document.getElementById('winner').querySelector('p').innerText = `ভোট: ${votes[winnerIndex]}`;
    document.getElementById('winner').querySelector('p').innerText += ` - তারিখ: ${winnerDate}`;
    document.getElementById('winner').querySelector('p').innerText += `\nআপনি একটি ইসলামীক বই উপহার পেয়েছেন!`;

    // Add winner to the winner list
    updateWinnerList(winnerName, winnerDate);

    // Disable voting after winner is announced
    let buttons = document.querySelectorAll('.card button');
    buttons.forEach(button => button.disabled = true);
}

// Function to update winner list
function updateWinnerList(winnerName, winnerDate) {
    const ul = document.getElementById('winner-list-ul');
    const li = document.createElement('li');
    li.innerHTML = `<img src="winner.jpg" alt="Winner"> ${winnerName} - ${winnerDate}`;
    ul.appendChild(li);
}

// Function to reset votes after 6 hours
function resetVotes() {
    votes = [0, 0, 0, 0, 0];
    document.querySelectorAll('.votes').forEach(voteElement => {
        voteElement.innerText = 'ভোট: 0';
    });
    votingStartedAt = Date.now(); // Restart the voting timer
    alert("ভোটিং সিস্টেম পুনরায় শুরু হয়েছে।");
}

// Function to start the voting manually (only for admin)
function startVoting() {
    // Check if the current user is the admin
    if (currentUser === adminUsername) {
        votingStarted = true;
        votingStartedAt = Date.now();
        alert("ভোটিং শুরু হয়েছে!");
    } else {
        alert("আপনি এডমিন নন, আপনি ভোটিং শুরু করতে পারবেন না!");
    }
}

// Simulating user login (In real implementation, this would be done via a login system)
function login(username) {
    currentUser = username;
}

// Example: To simulate admin login
login("yourAdminUsername"); // Replace with your admin username
