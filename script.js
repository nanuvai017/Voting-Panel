let voteCounts = [0, 0, 0, 0]; // Initial votes for all candidates
let voted = false; // To track if the user has already voted
let winnerDeclared = false; // To check if winner is declared or not
const voteElements = [
    document.getElementById("votes-person1"),
    document.getElementById("votes-person2"),
    document.getElementById("votes-person3"),
    document.getElementById("votes-person4")
];
let currentVotingState = "inactive"; // Can be 'inactive', 'active'

// This function handles the voting process
function vote(candidateIndex) {
    if (voted) {
        alert("আপনি ইতিমধ্যে একটি ভোট দিয়েছেন!");
        return;
    }

    if (currentVotingState !== "active") {
        alert("ভোটিং এখন বন্ধ। পরবর্তীতে আবার চেষ্টা করুন!");
        return;
    }

    // Increment the vote count for the chosen candidate
    voteCounts[candidateIndex]++;
    voteElements[candidateIndex].innerHTML = `ভোট: ${voteCounts[candidateIndex]}`;

    // Mark that the user has voted
    voted = true;

    // Check if any candidate has reached 200 votes
    checkWinner();
}

// This function checks if there is a winner (200 votes)
function checkWinner() {
    if (!winnerDeclared) {
        for (let i = 0; i < voteCounts.length; i++) {
            if (voteCounts[i] >= 200) {
                declareWinner(i);
                break;
            }
        }
    }
}

// Declare the winner if a candidate reaches 200 votes
function declareWinner(index) {
    winnerDeclared = true;
    document.getElementById("winner").style.display = "block";
    document.querySelector('#winner h3').textContent = `বিজয়ী: ${document.querySelectorAll('.card h3')[index].textContent}`;
    document.querySelector('#winner p').textContent = `ভোট: ${voteCounts[index]}`;
    document.querySelector('#winner p:nth-of-type(2)').textContent = `তারিখ: ${new Date().toLocaleDateString()}`;
    document.querySelector('#winner p:nth-of-type(3)').textContent = "আপনি একটি ইসলামীক বই উপহার পেয়েছেন!";
}

// Countdown Timer for 6 hours
let countdownDate = new Date().getTime() + 6 * 60 * 60 * 1000; // 6 hours from now

let countdownInterval = setInterval(function() {
    let now = new Date().getTime();
    let distance = countdownDate - now;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown').innerHTML = "ভোটিং শেষ!";
        // Trigger winner announcement when voting ends
        checkWinner();
        currentVotingState = "inactive"; // Disable voting after time is over
    } else {
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.querySelector('.countdown').innerHTML = `ভোটিং সময়: ${hours}:${minutes}:${seconds}`;
    }
}, 1000);

// Start Voting Button
function startVoting() {
    let evaCode = document.getElementById('start-input').value.trim(); // Only you know the EVA code
    if (evaCode === 'EVA') {
        alert("ভোটিং শুরু হয়েছে!");
        currentVotingState = "active"; // Voting is now active
        document.getElementById("start-voting").disabled = true; // Disable the start button after clicking
        document.getElementById('start-input').disabled = true; // Disable EVA input field after use
    } else {
        alert("অনুগ্রহ করে সঠিক EVA কোড প্রদান করুন!");
    }
                                                                 }
    
