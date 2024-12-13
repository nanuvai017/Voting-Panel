let votingStarted = false;
let votes = [0, 0, 0, 0];
let voterVoted = false;
let countdown;
let timeLeft = 6 * 60 * 60 * 1000;

function startVoting() {
    const evaCode = document.getElementById('start-input').value.trim();
    if (evaCode === 'EVA') {
        alert("ভোটিং শুরু হয়েছে!");
        votingStarted = true;
        document.getElementById("start-input").disabled = true;
        document.getElementById("start-voting").disabled = true;
        startCountdown();
    } else {
        alert("সঠিক কোড লিখুন!");
    }
}

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
    document.getElementById(`votes-person${candidateIndex + 1}`).innerText = `ভোট: ${votes[candidateIndex]}`;
    voterVoted = true;
    checkForWinner();
}

function checkForWinner() {
    let winnerIndex = votes.findIndex(vote => vote >= 200);
    if (winnerIndex !== -1) {
        announceWinner(winnerIndex);
    }
}

function announceWinner(winnerIndex) {
    votingStarted = false;
    clearInterval(countdown);
    document.getElementById("winner").style.display = "block";
    document.querySelector("#winner .winner-details h3").innerText = `প্রার্থী: Person ${winnerIndex + 1}`;
    document.querySelector("#winner .winner-details p").innerText = `ভোট: ${votes[winnerIndex]}`;
    alert(`বিজয়ী ঘোষণা হয়েছে: Person ${winnerIndex + 1}!`);
}

function startCountdown() {
    const countdownElement = document.querySelector(".countdown");
    countdown = setInterval(() => {
        timeLeft -= 1000;
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

function endVoting() {
    votingStarted = false;
    alert("ভোটিং সময় শেষ হয়েছে!");
    checkForWinner();
                                                                                      }
