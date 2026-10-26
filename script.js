
/* ========================================
   PROJECT LELO | MISSION 25
   Main interactions and mission controller
======================================== */

const startButton = document.getElementById("start-mission");
const nextButton = document.getElementById("next-mission");

const bootScreen = document.getElementById("boot-screen");
const missionScreen = document.getElementById("mission-screen");

const missionContent = document.getElementById("mission-content");
const missionCounter = document.getElementById("mission-counter");
const progressBar = document.getElementById("progress-bar");
const confettiContainer = document.getElementById("confetti-container");

// Six missions, in order.

const missions = [
  {
    title: "DECODE 2001",
    label: "MISSION 01",
    command: "analyze_birth_year()",
    description:
      "In 2001, scientists published landmark analyses of the human genome. A new era of biological data was taking shape.",
    detail:
      "Another interesting dataset entered the world that year: you, Mbulelo. Twenty-five years of potential, still unfolding.",
    button: "CONTINUE TO ANALYSIS"
  },
  {
    title: "SUBJECT ANALYSIS",
    label: "MISSION 02",
    command: "run_personality_model()",
    description:
      "Preliminary observations have been collected. Time to inspect the available data.",
    detail:
      "Hackathon energy: detected. Curiosity: high. Goofiness: confirmed. Smile effect: statistically significant. Side-to-side movement: observed, cause unknown.",
    button: "INSPECT SOUNDTRACK"
  },
  {
    title: "LOAD THE SOUNDTRACK",
    label: "MISSION 03",
    command: "load_lelo_mix()",
    description:
      "Every great project deserves a soundtrack.",
    detail:
      "This is where your favourite songs will go. The playlist is still being compiled, so you can add your tracks when you're ready.",
    button: "RUN MATURITY CHECK"
  },
  {
    title: "THE MEDULLA INCIDENT",
    label: "MISSION 04",
    command: "check_adult_status()",
    description:
      "Running the highly questionable maturity assessment...",
    detail:
      "AGE = 25. ADULT STATUS = TRUE. MEDULLA STATUS = COOKED. BRO, YOU ARE A WHOLE ADULT NOW. PLEASE ACT ACCORDINGLY.",
    button: "UNLOCK NEXT OBJECTIVE"
  },
  {
    title: "NEXT CHAPTER",
    label: "MISSION 05",
    command: "predict_future()",
    description:
      "Potential detected. Ambition detected. More possibilities than this model can predict.",
    detail:
      "May the next chapter bring meaningful discoveries, exciting opportunities, growth and the courage to build the future you're working towards.",
    button: "UNLOCK FINAL MESSAGE"
  },
  {
    title: "HAPPY BIRTHDAY, LELO",
    label: "MISSION 06",
    command: "execute_birthday_surprise()",
    description:
      "Mission objectives complete. One final message awaits.",
    detail:
      "Happy birthday, Lelo! I hope you have a beautiful day and enjoy every moment of it. May God bless you with many more years, filled with joy, prosperity, growth and even greater achievements. May your life always be covered by the Lord, and may His protection, grace and favour follow you wherever you go. I pray this new chapter brings you closer to all you're working towards and everything God has in store for you. Have an amazing birthday, Lelo.",
    button: "CELEBRATE 🎉"
  }
];

let currentMission = 0;
let missionStarted = false;

// Launch the mission interface.

startButton.addEventListener("click", () => {
  bootScreen.hidden = true;
  missionScreen.hidden = false;
  missionStarted = true;

  renderMission();
});

// Display the current mission.

function renderMission() {
  const mission = missions[currentMission];

  missionCounter.textContent =
    `${mission.label} / 06`;

  progressBar.style.width =
    `${((currentMission + 1) / missions.length) * 100}%`;

  missionContent.innerHTML = `
    <p class="terminal-label">
      &gt;&gt;&gt; ${mission.command}
    </p>

    <h2>${mission.title}</h2>

    <p>${mission.description}</p>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> ${mission.command}</p>
      <p>${mission.detail}</p>
    </div>

    <button id="next-mission" class="primary-button">
      ${mission.button} →
    </button>
  `;

  // Reconnect the button after rendering new content.
  document
    .getElementById("next-mission")
    .addEventListener("click", advanceMission);
}

// Move to the next mission or celebrate at the end.

function advanceMission() {
  if (!missionStarted) return;

  if (currentMission === missions.length - 1) {
    launchConfetti();
    showFinalCelebration();
    return;
  }

  currentMission += 1;
  renderMission();

  if (currentMission === 3) {
    launchConfetti();
  }
}

// Final celebration.

function showFinalCelebration() {
  missionCounter.textContent = "ALL MISSIONS COMPLETE";
  progressBar.style.width = "100%";

  missionContent.innerHTML = `
    <p class="terminal-label">
      [SUCCESS] ALL OBJECTIVES COMPLETED
    </p>

    <h2>VERSION 2.5: UNLOCKED. 🎉</h2>

    <p>
      Twenty-five years of evolution.
      A lifetime of possibilities.
    </p>

    <p>
      Happy birthday, Lelo. Keep learning,
      keep building, keep laughing, and keep becoming.
    </p>

    <p class="terminal-label">
      >>> END_OF_MISSION
    </p>
  `;

  launchConfetti();
}

// Confetti generator.

function launchConfetti() {
  const colours = [
    "#7ee787",
    "#79c0ff",
    "#d2a8ff",
    "#f2cc60",
    "#ff7b72",
    "#ffffff"
  ];

  const numberOfPieces = 100;

  for (let i = 0; i < numberOfPieces; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor =
      colours[Math.floor(Math.random() * colours.length)];

    piece.style.animationDelay = `${Math.random() * 1.5}s`;
    piece.style.animationDuration =
      `${2 + Math.random() * 2}s`;

    confettiContainer.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}
