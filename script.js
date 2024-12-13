let votes = [0, 0, 0, 0]; // প্রতিটি প্রার্থীর ভোট সংখ্যা
let votingStarted = false;
let voterVoted = false; // ভোটার ভোট দিয়েছে কিনা
let countdown;
let timeLeft = 6 * 60 * 60 * 1000; // 6 ঘণ্টা (মিলিসেকেন্ড)

// পেজ লোড হওয়ার সময় ডেটা LocalStorage থেকে লোড করুন
window.onload = () => {
    const savedVotes = localStorage.getItem("votes");
    const savedVotingStarted = localStorage.getItem("votingStarted");
    const savedVoterVoted = localStorage.getItem("voterVoted");
    const savedTimeLeft = localStorage.getItem("timeLeft");

    if (savedVotes) {
        votes = JSON.parse(savedVotes);
        updateVoteUI();
    }

    votingStarted = savedVotingStarted === "true";
    voterVoted = savedVoterVoted === "true";

    if (savedTimeLeft) {
        timeLeft = parseInt(savedTimeLeft, 10);
    }

    if (votingStarted) {
        startCountdown();
    }
};

// ভোটিং শুরু করার ফাংশন
function startVoting() {
    const evaCode = document.getElementById("start-input").value.trim();
    if (evaCode === "EVA") {
        alert("ভোটিং শুরু হয়েছে!");
        votingStarted = true;
        localStorage.setItem("votingStarted", "true");
        localStorage.setItem("timeLeft", timeLeft.toString());
        document.getElementById("start-input").disabled = true;
        document.getElementById("start-voting").disabled = true;
        startCountdown();
    } else {
        alert("সঠিক কোড লিখুন!");
    }
}

// ভোট দেয়ার ফাংশন
function vote(candidateIndex) {
    if (!votingStarted) {
        alert("ভোটিং এখনও শুরু হয়নি!");
        return;
    }

    if (voterVoted) {
        alert("আপনি ইতিমধ্যে ভোট দিয়েছেন!");
        return;
    }

    votes[candidateIndex]++;
    voterVoted = true;

    // LocalStorage-এ ডেটা সেভ করুন
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("voterVoted", "true");

    updateVoteUI();
    checkForWinner();
}

// ভোট সংখ্যা UI-তে আপডেট করার ফাংশন
function updateVoteUI() {
    for (let i = 0; i < votes.length; i++) {
        document.getElementById(`votes-person${i + 1}`).innerText = `ভোট: ${votes[i]}`;
    }
}

// বিজয়ী চেক করার ফাংশন
function checkForWinner() {
    let winnerIndex = votes.findIndex((vote) => vote >= 200);
    if (winnerIndex !== -1) {
        announceWinner(winnerIndex);
    }
}

// বিজয়ী ঘোষণা করার ফাংশন
function announceWinner(winnerIndex) {
    votingStarted = false;
    clearInterval(countdown);

    // বিজয়ী UI-তে দেখান
    document.getElementById("winner").style.display = "block";
    document.querySelector("#winner .winner-details h3").innerText = `প্রার্থী: Person ${winnerIndex + 1}`;
    document.querySelector("#winner .winner-details p").innerText = `ভোট: ${votes[winnerIndex]}`;

    alert(`বিজয়ী ঘোষণা হয়েছে: Person ${winnerIndex + 1}!`);

    // LocalStorage আপডেট করুন
    localStorage.setItem("votingStarted", "false");
}

// কাউন্টডাউন শুরু করার ফাংশন
function startCountdown() {
    const countdownElement = document.querySelector(".countdown");
    countdown = setInterval(() => {
        timeLeft -= 1000;

        // LocalStorage-এ সময় আপডেট করুন
        localStorage.setItem("timeLeft", timeLeft.toString());

        let hours = Math.floor(timeLeft / (60 * 60 * 1000));
        let minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        let seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
        countdownElement.innerText = `সময় বাকি: ${hours} ঘন্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endVoting();
        }
    }, 1000);
}

// ভোটিং শেষ করার ফাংশন
function endVoting() {
    votingStarted = false;
    alert("ভোটিং সময় শেষ হয়েছে!");
    checkForWinner();

    // LocalStorage আপডেট করুন
    localStorage.setItem("votingStarted", "false");
}
