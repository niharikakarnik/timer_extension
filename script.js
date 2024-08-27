const dropdown = document.getElementById('client-dropdown');
const addClientForm = document.getElementById('add-client-form');
const timerContainer = document.getElementById('timer-container');
const timerDisplay = document.getElementById('timer');

let clientTimers = {};  // Object to keep track of time for each client
let currentClient = null;
let seconds = 0;
let timerInterval = null;

dropdown.addEventListener('change', function() {
    if (this.value === 'add-new') {
        addClientForm.style.display = 'block';
        timerContainer.style.display = 'none';
        stopTimer(); // Stop any running timer when adding a new client
    } else {
        addClientForm.style.display = 'none';
        currentClient = this.value;

        if (!clientTimers[currentClient]) {
            clientTimers[currentClient] = 0;
        }

        seconds = clientTimers[currentClient];  // Load the saved time for the selected client
        updateTimerDisplay();
        timerContainer.style.display = 'block';
    }
});

function addClient() {
    const clientName = document.getElementById('new-client-name').value;
    if (clientName) {
        const option = document.createElement('option');
        option.text = clientName;
        option.value = clientName.toLowerCase().replace(/\s+/g, '-');
        dropdown.add(option, dropdown.options[dropdown.options.length - 1]);
        dropdown.value = option.value;
        addClientForm.style.display = 'none';
        document.getElementById('new-client-name').value = '';
        currentClient = option.value;

        clientTimers[currentClient] = 0;  // Initialize timer for the new client
        seconds = 0;
        updateTimerDisplay();
        timerContainer.style.display = 'block';
    } else {
        alert('Please enter a client name.');
    }
}

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals

    timerInterval = setInterval(function() {
        seconds++;
        clientTimers[currentClient] = seconds;  // Save the time for the current client
        document.getElementById('timer').innerText = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    clientTimers[currentClient] = 0;  // Reset the time for the current client
    document.getElementById('timer').innerText = formatTime(seconds);
}

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function updateTimerDisplay() {
    document.getElementById('timer').innerText = formatTime(seconds);
}