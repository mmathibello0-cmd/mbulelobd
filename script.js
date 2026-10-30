
/* =========================================
   PROJECT LELO | MISSION 25
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   01. ELEMENT REFERENCES
========================================= */

const bootScreen = document.getElementById("boot-screen");
const missionScreen = document.getElementById("mission-screen");

const initializationForm = document.getElementById(
  "initialization-form"
);

const nameInput = document.getElementById("subject-name");
const ageInput = document.getElementById("subject-age");

const initializeButton = document.getElementById(
  "initialize-button"
);

const terminalOutput = document.getElementById(
  "terminal-output"
);

const terminalPrompt = document.getElementById(
  "terminal-prompt"
);

const startMissionButton = document.getElementById(
  "start-mission"
);

const missionContent = document.getElementById(
  "mission-content"
);

const versionNumber = document.getElementById(
  "version-number"
);

const missionCounter = document.getElementById(
  "mission-counter"
);

const progressText = document.getElementById(
  "progress-text"
);

const progressBar = document.getElementById(
  "progress-bar"
);

const progressTrack = document.getElementById(
  "progress-track"
);

const systemStatus = document.getElementById(
  "system-status"
);

const objectiveItems = document.querySelectorAll(
  ".objective-item"
);


/* =========================================
   02. SUBJECT PROFILE
========================================= */

let subjectName = "";
let subjectAge = 0;
let currentMission = 0;

const visitedMissions = new Set();

let initializationComplete = false;


/* =========================================
   03. MISSION DATA
========================================= */

const missions = [

  {
    number: "01",
    title: "Data Acquisition",
    label: "MISSION 01 // THE BEGINNING",

    description:
      "Every great discovery starts somewhere. Before we can analyse a subject, we need to understand the data that makes up the story.",

    detail:
      "This is where the investigation begins. The subject profile has been created. Now it's time to explore the information, experiences and possibilities that make this individual unique.",

    prompt:
      "OBJECTIVE: IDENTIFY THE SUBJECT'S CORE DATA."
  },

  {
    number: "02",
    title: "Data Cleaning & EDA",
    label: "MISSION 02 // LOOKING CLOSER",

    description:
      "Raw data rarely tells the whole story. Sometimes the most interesting discoveries are hidden beneath the surface.",

    detail:
      "Explore the patterns, unexpected details and little contradictions that make a person who they are. Not everything can be understood at first glance.",

    prompt:
      "OBJECTIVE: EXPLORE THE PATTERNS."
  },

  {
    number: "03",
    title: "Data Visualisation",
    label: "MISSION 03 // SEEING THE BIGGER PICTURE",

    description:
      "Numbers can tell a story. Patterns can reveal a bigger picture. And sometimes, the most meaningful things cannot be expressed through numbers alone.",

    detail:
      "Transform observations into something visual. Discover how different elements connect, overlap and create a picture that is uniquely yours.",

    prompt:
      "OBJECTIVE: TURN DATA INTO A STORY."
  },

  {
    number: "04",
    title: "Model Evaluation",
    label: "MISSION 04 // TESTING THE THEORY",

    description:
      "A good model is never accepted without examination. Every prediction deserves a second look.",

    detail:
      "Consider the decisions, lessons and experiences that have shaped the subject so far. Evaluate the progress, recognise the growth and remember that development is ongoing.",

    prompt:
      "OBJECTIVE: MEASURE THE PROGRESS."
  },

  {
    number: "05",
    title: "Interpretation & Insights",
    label: "MISSION 05 // BEYOND THE NUMBERS",

    description:
      "Data becomes meaningful when we understand what it represents. The real story often goes beyond the results.",

    detail:
      "Look beyond the obvious. Consider identity, creativity, heritage, ambition and the experiences that give meaning to the journey.",

    prompt:
      "OBJECTIVE: DISCOVER WHAT THE DATA CANNOT SAY."
  },

  {
    number: "06",
    title: "Final Birthday Report",
    label: "MISSION 06 // THE FINAL REPORT",

    description:
      "Twenty-five years of data. Countless experiences. An entirely new chapter waiting to unfold.",

    detail:
      "The investigation reaches its final stage. All objectives lead here, to a celebration of the person behind the profile and the possibilities still ahead.",

    prompt:
      "OBJECTIVE: GENERATE THE FINAL REPORT."
  }

];


/* =========================================
   04. HELPER: WAIT
========================================= */

function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}


/* =========================================
   05. TERMINAL MESSAGE CREATION
========================================= */

function addTerminalLine(message) {

  const line = document.createElement("p");

  line.classList.add("terminal-line");

  const prompt = document.createElement("span");

  prompt.classList.add("prompt");
  prompt.textContent = ">>>";

  line.appendChild(prompt);

  line.appendChild(
    document.createTextNode(" " + message)
  );

  terminalOutput.appendChild(line);

  return line;
}


/* =========================================
   06. BOOT SEQUENCE
========================================= */

async function runBootSequence() {

  const bootMessages = [

    "INITIALIZING PROJECT LELO...",

    `SUBJECT IDENTIFIED: ${subjectName.toUpperCase()}`,

    `AGE VERIFIED: ${subjectAge}`,

    `PROFILE CREATED: VERSION ${(subjectAge / 10).toFixed(1)}`,

    "LOADING SIX MISSION OBJECTIVES...",

    "PERSONALIZED EXPERIENCE READY.",

    "ACCESS GRANTED."

  ];

  // Remove the original waiting prompt.

  if (terminalPrompt) {
    terminalPrompt.remove();
  }

  // Display each message individually.

  for (let i = 0; i < bootMessages.length; i++) {

    await wait(850);

    addTerminalLine(bootMessages[i]);

  }

  // Short pause after the final message.

  await wait(1000);

  initializationComplete = true;

  // Reveal the mission launch button.

  startMissionButton.hidden = false;
  startMissionButton.disabled = false;

  systemStatus.textContent = "PROFILE INITIALIZED";

}


/* =========================================
   07. INITIALIZATION FORM
========================================= */

initializationForm.addEventListener("submit", async function(event) {

  event.preventDefault();

  // Prevent duplicate submissions.

  if (initializationComplete || initializeButton.disabled) {
    return;
  }

  subjectName = nameInput.value.trim();

  subjectAge = Number(ageInput.value);

  // Validate the information.

  if (!subjectName || !Number.isInteger(subjectAge) ||
      subjectAge < 1 || subjectAge > 120) {

    return;
  }

  // Lock the form during initialization.

  initializeButton.disabled = true;

  initializeButton.textContent = "INITIALIZING...";

  nameInput.disabled = true;
  ageInput.disabled = true;

  // Start the terminal sequence.

  await runBootSequence();

  // Hide the form once initialization is complete.

  initializationForm.hidden = true;

  // Update the version.

  versionNumber.textContent =
    `v${(subjectAge / 10).toFixed(1)}`;

});


/* =========================================
   08. LAUNCH MISSION CONTROL
========================================= */

startMissionButton.addEventListener("click", function() {

  if (!initializationComplete) {
    return;
  }

  bootScreen.hidden = true;

  missionScreen.hidden = false;

  systemStatus.textContent = "MISSION CONTROL ACTIVE";

  // Start with the first objective.

  openMission(0);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================
   09. UPDATE PROGRESS
========================================= */

function updateProgress() {

  const completedCount = visitedMissions.size;

  const percentage = Math.round(
    (completedCount / missions.length) * 100
  );

  progressBar.style.width = `${percentage}%`;

  progressText.textContent =
    `${percentage}% COMPLETE`;

  progressTrack.setAttribute(
    "aria-valuenow",
    percentage
  );

}


/* =========================================
   10. UPDATE OBJECTIVE NAVIGATION
========================================= */

function updateObjectiveNavigation() {

  objectiveItems.forEach((item, index) => {

    item.classList.toggle(
      "active",
      index === currentMission
    );

    item.classList.toggle(
      "visited",
      visitedMissions.has(index)
    );

    if (index === currentMission) {

      item.setAttribute("aria-current", "step");

    } else {

      item.removeAttribute("aria-current");

    }

  });

}


/* =========================================
   11. OPEN A MISSION
========================================= */

function openMission(index) {

  if (index < 0 || index >= missions.length) {
    return;
  }

  currentMission = index;

  const mission = missions[index];

  // Mark this objective as visited.

  visitedMissions.add(index);

  // Update navigation and progress.

  updateObjectiveNavigation();

  updateProgress();

  missionCounter.textContent =
    `MISSION ${mission.number} / 06`;

  systemStatus.textContent =
    `VIEWING MISSION ${mission.number}`;

  // Clear previous mission content.

  missionContent.replaceChildren();

  // Create mission label.

  const label = document.createElement("p");

  label.className = "terminal-label";
  label.textContent = mission.label;

  // Create mission heading.

  const heading = document.createElement("h2");

  heading.textContent = mission.title;

  // Create description.

  const description = document.createElement("p");

  description.textContent = mission.description;

  // Create additional details.

  const detail = document.createElement("p");

  detail.textContent = mission.detail;

  // Create objective prompt.

  const prompt = document.createElement("p");

  prompt.className = "mission-prompt";
  prompt.textContent = mission.prompt;

  // Create navigation controls.

  const controls = document.createElement("div");

  controls.className = "mission-controls";

  if (index > 0) {

    const previousButton = document.createElement("button");

    previousButton.type = "button";
    previousButton.className = "primary-button";

    previousButton.textContent = "← PREVIOUS";

    previousButton.addEventListener("click", function() {
      openMission(index - 1);
    });

    controls.appendChild(previousButton);

  }

  if (index < missions.length - 1) {

    const nextButton = document.createElement("button");

    nextButton.type = "button";
    nextButton.className = "primary-button";

    nextButton.textContent = "NEXT OBJECTIVE →";

    nextButton.addEventListener("click", function() {
      openMission(index + 1);
    });

    controls.appendChild(nextButton);

  } else {

    const finalButton = document.createElement("button");

    finalButton.type = "button";
    finalButton.className = "primary-button";

    finalButton.textContent = "REVISIT MISSION 01 ↺";

    finalButton.addEventListener("click", function() {
      openMission(0);
    });

    controls.appendChild(finalButton);

  }

  // Add everything to the mission area.

  missionContent.append(
    label,
    heading,
    description,
    detail,
    prompt,
    controls
  );

  // Bring the active mission into view.

  missionContent.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================
   12. OBJECTIVE CLICK EVENTS
========================================= */

objectiveItems.forEach((item, index) => {

  item.addEventListener("click", function() {

    openMission(index);

  });

  // Keyboard accessibility.

  item.addEventListener("keydown", function(event) {

    if (event.key === "Enter" || event.key === " ") {

      event.preventDefault();

      openMission(index);

    }

  });

});


/* =========================================
   13. INITIAL SYSTEM STATE
========================================= */

function initializeSystem() {

  // Start at the top of the boot screen.

  bootScreen.hidden = false;

  missionScreen.hidden = true;

  startMissionButton.hidden = true;
  startMissionButton.disabled = true;

  // Initialize progress.

  progressBar.style.width = "0%";

  progressText.textContent = "0% COMPLETE";

  progressTrack.setAttribute(
    "aria-valuenow",
    "0"
  );

  missionCounter.textContent = "MISSION 01 / 06";

  systemStatus.textContent = "AWAITING INITIALIZATION";

}


// Run when the page loads.

initializeSystem();
