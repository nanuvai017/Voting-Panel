let voteCounts = [0, 0, 0, 0];
const voteElements = [
    document.getElementById("votes-person1"),
    document.getElementById("votes-person2"),
    document.getElementById("votes-person3"),
    document.getElementById("votes-person4")
];

function vote(candidateIndex) {
    voteCounts[candidateIndex]++;
    voteElements[candidateIndex].innerHTML = `ভোট: ${voteCounts[candidateIndex]}`;
}

let countdownDate = new Date().getTime() + 6 * 60 * 60 * 1000; // 6 hours from now

let countdownInterval = setInterval(function() {
    let now = new Date().getTime();
    let distance = countdownDate - now;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown').innerHTML = "ভোটিং শেষ!";
        // Optionally, trigger winner announcement
        document.getElementById("winner").style.display = "block";
    } else {
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.querySelector('.countdown').innerHTML = `ভোটিং সময়: ${hours}:${minutes}:${seconds}`;
    }
}, 1000);

function startVoting() {
    const startInput = document.getElementById("start-input").value;
    if (startInput.toLowerCase() === "eva") {
        alert("ভোটিং শুরু হয়েছে!");
        document.getElementById("start-voting").disabled = true;
    } else {
        alert("অনুগ্রহ করে সঠিক শব্দ লিখুন।");
    }
}
