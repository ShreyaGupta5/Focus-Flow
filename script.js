let habits = JSON.parse(localStorage.getItem("habits")) || [];
let timerInterval;
let timeLeft = 300; // 25 minutes

const habitList = document.getElementById("habitList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const timerDisplay = document.getElementById("timer");

// Save habits
function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// Render habits
function renderHabits() {
    habitList.innerHTML = "";
    let completed = 0;

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.done;

        checkbox.onchange = () => {
            habits[index].done = checkbox.checked;
            saveHabits();
            renderHabits();
        };

        const span = document.createElement("span");
        span.textContent = habit.name;

        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.onclick = () => {
            habits.splice(index, 1);
            saveHabits();
            renderHabits();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);

        habitList.appendChild(li);

        if (habit.done) completed++;
    });

    updateProgress(completed);
}

// Add new habit
function addHabit() {
    const input = document.getElementById("habitInput");
    if (input.value.trim() === "") return;

    habits.push({ name: input.value, done: false });
    input.value = "";
    saveHabits();
    renderHabits();
}

// Update progress bar
function updateProgress(completed) {
    const total = habits.length;
    const percent = total === 0 ? 0 : (completed / total) * 100;

    progressFill.style.width = percent + "%";
    progressText.textContent = percent.toFixed(0) + "% Completed";
}

// Start timer
function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("🎉 Focus Session Completed!");
            return;
        }

        timeLeft--;
        updateTimer();
    }, 1000);
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 300;
    updateTimer();
}

// Update timer display
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Dark mode toggle
document.getElementById("darkBtn").onclick = () => {
    document.body.classList.toggle("dark");
};

// Initial load
renderHabits();
updateTimer();
