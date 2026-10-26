
/* ==========================================
   PROJECT LELO | MISSION 25
   Mission controller, interactions & effects
   Build: v2.5
========================================== */


/* ---------- 1. ELEMENT REFERENCES ---------- */

const startButton = document.getElementById("start-mission");
const bootScreen = document.getElementById("boot-screen");
const missionScreen = document.getElementById("mission-screen");

const missionContent = document.getElementById("mission-content");
const missionCounter = document.getElementById("mission-counter");
const progressBar = document.getElementById("progress-bar");
const progressTrack = document.getElementById("progress-track");
const progressText = document.getElementById("progress-text");

const confettiContainer = document.getElementById("confetti-container");
const systemStatus = document.getElementById("system-status");

const objectiveItems = document.querySelectorAll(".objective-item");

const TOTAL_MISSIONS = 6;

let currentMission = 0;
let missionStarted = false;
let missionCompleted = false;

// The furthest mission the user has unlocked.
let maxUnlockedMission = 0;
let maturityAnswerRevealed = false;
let isDemoPlaying = false;


/* ---------- 2. MISSION DATA ---------- */

const missions = [
  {
    title: "DECODE 2001",
    label: "MISSION 01",
    command: "analyze_birth_year()",
    description:
      "Every great discovery starts with a question. What was happening in science during the year our birthday subject entered the world?",
    button: "CONTINUE TO SUBJECT ANALYSIS"
  },
  {
    title: "SUBJECT ANALYSIS",
    label: "MISSION 02",
    command: "run_personality_model()",
    description:
      "A preliminary investigation into the person behind the project. The available observations have been processed. The results are... interesting.",
    button: "INSPECT THE SOUNDTRACK"
  },
  {
    title: "LOAD THE SOUNDTRACK",
    label: "MISSION 03",
    command: "load_lelo_mix()",
    description:
      "No good project is complete without a soundtrack. This module is ready for the songs that make the subject's world sound like him.",
    button: "RUN MATURITY CHECK"
  },
  {
    title: "THE MEDULLA INCIDENT",
    label: "MISSION 04",
    command: "check_adult_status()",
    description:
      "Twenty-five years on this planet. The system has requested a formal investigation into whether the subject has accepted his adult status.",
    button: "UNLOCK THE NEXT CHAPTER"
  },
  {
    title: "NEXT CHAPTER",
    label: "MISSION 05",
    command: "predict_future()",
    description:
      "Some things cannot be predicted by a model. The next chapter will be built through choices, faith, effort, curiosity and all the opportunities still waiting to be discovered.",
    button: "UNLOCK YOUR BIRTHDAY MESSAGE"
  },
  {
    title: "HAPPY BIRTHDAY, LELO",
    label: "MISSION 06",
    command: "execute_birthday_surprise()",
    description:
      "All preliminary objectives have been completed. One final birthday message has been prepared for the subject.",
    button: "REVEAL FINAL MESSAGE"
  }
];


/* ---------- 3. START THE MISSION ---------- */

startButton.addEventListener("click", () => {
  bootScreen.hidden = true;
  missionScreen.hidden = false;

  missionStarted = true;
  missionCompleted = false;
  currentMission = 0;

  updateSystemStatus("MISSION INITIALIZED");
  renderMission();

  missionScreen.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


/* ---------- 4. RENDER THE CURRENT MISSION ---------- */

function renderMission() {
  const mission = missions[currentMission];

  updateProgress();
  updateObjectives();

  if (systemStatus) {
    systemStatus.textContent = "MISSION IN PROGRESS";
  }

  let missionHTML = "";

  switch (currentMission) {
    case 0:
      missionHTML = renderGenomeMission();
      break;

    case 1:
      missionHTML = renderSubjectAnalysis();
      break;

    case 2:
      missionHTML = renderSoundtrack();
      break;

    case 3:
      missionHTML = renderMaturityTest();
      break;

    case 4:
      missionHTML = renderNextChapter();
      break;

    case 5:
      missionHTML = renderBirthdayMission();
      break;

    default:
      missionHTML = "<p>Mission not found.</p>";
  }

  missionContent.innerHTML = `
    <p class="terminal-label">
      &gt;&gt;&gt; ${mission.command}
    </p>

    ${missionHTML}

    <button id="next-mission" class="primary-button">
      ${mission.button} →
    </button>
  `;

  document
    .getElementById("next-mission")
    .addEventListener("click", advanceMission);
}


/* ---------- 5. MISSION 01: DECODE 2001 ---------- */

function renderGenomeMission() {
  return `
    <h2>DECODE <span style="color:var(--green)">2001</span></h2>

    <p>
      In the year 2001, researchers published landmark analyses
      of the human genome. Biology was becoming a data-rich field,
      bringing together genetics, computation and scientific discovery.
    </p>

    <div class="detail-grid">

      <article class="detail-card">
        <span class="card-label">THE YEAR</span>
        <span class="card-value">2001</span>
        <span class="card-description">
          A milestone year in genome research.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">THE FIELD</span>
        <span class="card-value">GENOMICS</span>
        <span class="card-description">
          Studying the complete genetic information of an organism.
        </span>
      </article>

    </div>

    <div class="timeline">

      <article class="timeline-item">
        <span class="timeline-date">FEBRUARY 2001</span>
        <h3>The human genome comes into focus</h3>
        <p>
          Landmark draft analyses of the human genome were published
          in Nature and Science, giving researchers a much clearer
          picture of the human genetic blueprint.
        </p>
      </article>

      <article class="timeline-item">
        <span class="timeline-date">DECEMBER 2001</span>
        <h3>More of the code is decoded</h3>
        <p>
          A detailed analysis of chromosome 20 was published in Nature,
          adding to the growing scientific understanding of the genome.
        </p>
      </article>

      <article class="timeline-item">
        <span class="timeline-date">YOUR CHAPTER</span>
        <h3>Enter Mbulelo</h3>
        <p>
          Another story began in 2001. Twenty-five years later,
          the possibilities ahead are still unfolding.
        </p>
      </article>

    </div>

    <div class="info-panel">
      <p>
        <strong>WHY THIS MATTERS:</strong>
        Bioinformatics brings biology, statistics and computing together
        to help researchers make sense of biological data.
        It is one example of what happens when different fields meet.
      </p>
    </div>

    <p>
      <span style="color:var(--green);font-family:var(--font-code)">
        // Interesting data. Bigger questions. New possibilities.
      </span>
    </p>
  `;
}


/* ---------- 6. MISSION 02: SUBJECT ANALYSIS ---------- */

function renderSubjectAnalysis() {
  return `
    <h2>THE LELO DATASET</h2>

    <p>
      The subject was observed in his natural environment.
      The following report is based on playful personal observations,
      not scientific measurements. The research team accepts no
      responsibility for excessive confidence after reading it.
    </p>

    <div class="detail-grid">

      <article class="detail-card">
        <span class="card-label">Curiosity index</span>
        <span class="card-value">HIGH</span>
        <span class="card-description">
          Particularly when an interesting question appears.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">Hackathon energy</span>
        <span class="card-value">DETECTED</span>
        <span class="card-description">
          Competitions, coding and building things.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">Goofiness</span>
        <span class="card-value">CONFIRMED</span>
        <span class="card-description">
          Serious projects. Unserious moments.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">Smile effect</span>
        <span class="card-value">SIGNIFICANT*</span>
        <span class="card-description">
          *According to the highly biased research team.
        </span>
      </article>

    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> inspect_subject()</p>
      <p>Interests: coding, data, science and problem-solving</p>
      <p>Career direction: data science and bioinformatics</p>
      <p>Observed behaviour: occasional side-to-side movement</p>
      <p>Cause: UNKNOWN</p>
      <p class="success-line">
        [NOTE] Further observation may be required.
      </p>
    </div>

    <div class="highlight-panel">
      <p>
        <strong>RESEARCHER'S NOTE:</strong>
        Keep asking questions. Keep learning things that make you
        curious. The world needs people who want to understand how
        things work, not just accept that they do.
      </p>
    </div>
  `;
}


/* ---------- 7. MISSION 03: SOUNDTRACK ---------- */

function renderSoundtrack() {
  return `
    <h2>YOUR PERSONAL SOUNDTRACK</h2>

    <p>
      Every project needs a soundtrack. This section is reserved
      for the songs you enjoy, the ones you replay, and the ones
      that deserve a permanent spot in the rotation.
    </p>

    <div class="detail-card" style="margin:24px 0">

      <span class="card-label">NOW LOADING</span>

      <div style="
        display:flex;
        align-items:center;
        gap:16px;
        margin:16px 0;
      ">

        <div style="
          width:62px;
          height:62px;
          flex-shrink:0;
          display:grid;
          place-items:center;
          border:1px solid var(--border-bright);
          border-radius:10px;
          background:linear-gradient(135deg,#173d28,#172638);
          color:var(--green);
          font-size:26px;
        " aria-hidden="true">
          ♪
        </div>

        <div>
          <h3 style="font-size:17px">LELO.MIX</h3>
          <p style="color:var(--muted);font-size:12px">
            Personal playlist // Track list pending
          </p>
        </div>

      </div>

      <div id="demo-waveform" aria-hidden="true" style="
        display:flex;
        align-items:center;
        justify-content:center;
        gap:4px;
        height:42px;
        margin:20px 0;
        overflow:hidden;
      ">
        ${createWaveform()}
      </div>

      <button
        id="demo-play-button"
        type="button"
        class="primary-button"
        style="width:100%"
        aria-pressed="false"
      >
        ▶ PREVIEW VISUALIZER
      </button>

      <p id="demo-player-status" style="
        margin-top:12px;
        color:var(--muted);
        font-size:11px;
        text-align:center;
      ">
        Visualizer preview only. No music is playing yet.
      </p>

    </div>

    <div class="info-panel">
      <p>
        <strong>PLAYLIST STATUS:</strong>
        Waiting for the official soundtrack.
        Once the tracks are chosen, this module can be upgraded
        with real audio playback and track information.
      </p>
    </div>

    <p>
      A good playlist says a lot about a person.
      Let's make sure this one actually sounds like you.
    </p>
  `;
}


/* Create decorative bars for the visualizer. */

function createWaveform() {
  let bars = "";

  for (let i = 0; i < 36; i++) {
    const height = 8 + ((i * 17 + 11) % 29);

    bars += `
      <span class="wave-bar" style="
        display:block;
        flex:0 0 4px;
        height:${height}px;
        border-radius:4px;
        background:${i % 4 === 0
          ? "var(--purple)"
          : i % 3 === 0
            ? "var(--blue)"
            : "var(--green)"};
        opacity:0.8;
        transform-origin:center;
      "></span>
    `;
  }

  return bars;
}


/* ---------- 8. MISSION 04: MATURITY TEST ---------- */

function renderMaturityTest() {
  maturityAnswerRevealed = false;

  return `
    <h2>THE MEDULLA INCIDENT</h2>

    <p>
      An official birthday diagnostic has been requested.
      The subject has reached version 2.5, and the system
      would like to know whether he has accepted the update.
    </p>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> run_maturity_test()</p>
      <p>Age: 25</p>
      <p>Adult status: PENDING REVIEW</p>
      <p>Responsibility module: STILL INSTALLING</p>
      <p>Medulla status: NOT A VALID MATURITY METRIC</p>
    </div>

    <div class="detail-card" style="margin:24px 0">
      <span class="card-label">DIAGNOSTIC QUESTION 01</span>

      <h3 style="margin:8px 0 18px;font-size:19px">
        So, Lelo... are you officially a whole adult now?
      </h3>

      <div style="display:grid;gap:10px">

        <button
          type="button"
          class="primary-button maturity-answer"
          data-answer="yes"
          style="width:100%"
        >
          YES. I AM RESPONSIBLE. ✓
        </button>

        <button
          type="button"
          class="primary-button maturity-answer"
          data-answer="no"
          style="
            width:100%;
            color:var(--text);
            background:var(--panel-light);
            border-color:var(--border-bright);
          "
        >
          NO. PLEASE CONTACT SUPPORT.
        </button>

      </div>

      <div
        id="maturity-result"
        aria-live="polite"
        style="margin-top:18px"
      ></div>

    </div>

    <p style="font-size:12px">
      Scientific disclaimer: the medulla is part of the brainstem.
      This birthday joke is not a neurological assessment.
    </p>
  `;
}


/* ---------- 9. MISSION 05: NEXT CHAPTER ---------- */

function renderNextChapter() {
  return `
    <h2>THE NEXT CHAPTER</h2>

    <p>
      Twenty-five is not a finish line. It is another chapter,
      with more room to learn, experiment, build, change direction
      and discover what matters most to you.
    </p>

    <div class="detail-grid">

      <article class="detail-card">
        <span class="card-label">KEEP EXPLORING</span>
        <span class="card-value">01</span>
        <span class="card-description">
          Stay curious enough to keep asking better questions.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">KEEP BUILDING</span>
        <span class="card-value">02</span>
        <span class="card-description">
          Let your ideas become things you can share with the world.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">KEEP GROWING</span>
        <span class="card-value">03</span>
        <span class="card-description">
          Give yourself space to learn, change and improve.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">KEEP LAUGHING</span>
        <span class="card-value">04</span>
        <span class="card-description">
          Not every problem needs to become a serious production.
        </span>
      </article>

    </div>

    <div class="highlight-panel">
      <p>
        May the next chapter bring meaningful discoveries,
        exciting opportunities, growth and the courage to build
        the future you're working towards.
      </p>
    </div>

    <p>
      Some of the best things ahead have not even been imagined yet.
      There is still so much to discover.
    </p>
  `;
}


/* ---------- 10. MISSION 06: BIRTHDAY MESSAGE ---------- */

function renderBirthdayMission() {
  return `
    <h2>HAPPY BIRTHDAY, LELO! 🎉</h2>

    <p>
      The final message has been unlocked.
      No debugging required. Just a little birthday appreciation.
    </p>

    <div class="highlight-panel">

      <p>
        Happy birthday, Lelo! I hope you have a beautiful day
        and enjoy every moment of it.
      </p>

      <p style="margin-top:14px">
        May God bless you with many more years, filled with joy,
        prosperity, growth and even greater achievements.
        May your life always be covered by the Lord, and may His
        protection, grace and favour follow you wherever you go.
      </p>

      <p style="margin-top:14px">
        I pray this new chapter brings you closer to all you're
        working towards and everything God has in store for you.
        Have an amazing birthday, Lelo.
      </p>

    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> birthday_status()</p>
      <p>Age: 25</p>
      <p>Version: 2.5</p>
      <p>Potential: STILL DEVELOPING</p>
      <p>Future: OPEN</p>
      <p class="success-line">
        [SUCCESS] Birthday message delivered.
      </p>
    </div>
  `;
}


/* ---------- 11. MISSION NAVIGATION ---------- */


function advanceMission() {
  if (!missionStarted || missionCompleted) {
    return;
  }

  if (currentMission === missions.length - 1) {
    showFinalCelebration();
    return;
  }

  currentMission += 1;

  // Unlock the next objective.
  maxUnlockedMission = Math.max(
    maxUnlockedMission,
    currentMission
  );

  renderMission();

  if (currentMission === 3) {
    launchConfetti(45);
  }

  missionContent.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}



/* ---------- 12. PROGRESS BAR ---------- */

function updateProgress() {
  /*
    The progress indicator represents missions reached.
    The final 100% state is set when the experience is completed.
  */

  const percentage = Math.round(
    (currentMission / TOTAL_MISSIONS) * 100
  );

  if (missionCounter) {
    missionCounter.textContent =
      `${missions[currentMission].label} / 06`;
  }

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${percentage}% COMPLETE`;
  }

  if (progressTrack) {
    progressTrack.setAttribute(
      "aria-valuenow",
      String(percentage)
    );
  }
}


/* ---------- 13. OBJECTIVE INDICATORS ---------- */


function updateObjectives() {
  objectiveItems.forEach((item, index) => {
    item.classList.remove("active", "completed", "locked");

    const unlocked = index <= maxUnlockedMission;
    const completed = missionCompleted || index < currentMission;

    if (completed) {
      item.classList.add("completed");
    }

    if (index === currentMission && !missionCompleted) {
      item.classList.add("active");
    }

    if (!unlocked) {
      item.classList.add("locked");
    }

    // Give each objective accessible interactive behaviour.
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", unlocked ? "0" : "-1");
    item.setAttribute("aria-disabled", String(!unlocked));

    const name = item.querySelector(".objective-name");

    if (name) {
      const status = completed
        ? "completed"
        : index === currentMission && !missionCompleted
          ? "current mission"
          : unlocked
            ? "unlocked"
            : "locked";

      item.setAttribute(
        "aria-label",
        `${name.textContent}, ${status}`
      );
    }
  });
}


function openObjective(index) {
  if (!missionStarted || index > maxUnlockedMission) {
    return;
  }

  // Reopen any objective that has already been unlocked.
  currentMission = index;
  missionCompleted = false;

  renderMission();

  missionContent.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Mouse and touch navigation.
objectiveItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openObjective(index);
  });

  // Keyboard navigation.
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openObjective(index);
    }
  });
});

/* ---------- 14. BUTTON INTERACTIONS ---------- */

document.addEventListener("click", (event) => {
  const answerButton = event.target.closest(".maturity-answer");

  if (answerButton) {
    handleMaturityAnswer(answerButton.dataset.answer);
  }

  const playButton = event.target.closest("#demo-play-button");

  if (playButton) {
    toggleDemoVisualizer();
  }
});


/* ---------- 15. MATURITY ANSWER ---------- */

function handleMaturityAnswer(answer) {
  const result = document.getElementById("maturity-result");

  if (!result || maturityAnswerRevealed) {
    return;
  }

  maturityAnswerRevealed = true;

  const answerButtons = document.querySelectorAll(".maturity-answer");

  answerButtons.forEach((button) => {
    button.disabled = true;
    button.style.opacity = "0.6";
  });

  result.innerHTML = `
    <div class="highlight-panel">
      <p>
        <strong>
          ${answer === "yes"
            ? "SELF-CONFIDENCE DETECTED."
            : "SUPPORT TICKET RECEIVED."}
        </strong>
      </p>

      <p style="margin-top:10px">
        ${answer === "yes"
          ? "The system appreciates the confidence. Further testing will occur in real-world conditions."
          : "Support has reviewed your request. Unfortunately, the birthday update cannot be reversed."}
      </p>

      <p style="margin-top:10px">
        FINAL RESULT: ADULT STATUS = TRUE.
        MEDULLA STATUS = STILL NOT THE METRIC.
      </p>
    </div>
  `;

  launchConfetti(24);
}


/* ---------- 16. DEMO MUSIC VISUALIZER ---------- */

function toggleDemoVisualizer() {
  const playButton = document.getElementById("demo-play-button");
  const status = document.getElementById("demo-player-status");
  const waveform = document.getElementById("demo-waveform");

  if (!playButton || !status || !waveform) {
    return;
  }

  isDemoPlaying = !isDemoPlaying;

  playButton.setAttribute("aria-pressed", String(isDemoPlaying));

  playButton.textContent = isDemoPlaying
    ? "Ⅱ PAUSE VISUALIZER"
    : "▶ PREVIEW VISUALIZER";

  status.textContent = isDemoPlaying
    ? "Visualizer running. No audio is playing."
    : "Visualizer paused. No music is playing yet.";

  const bars = waveform.querySelectorAll(".wave-bar");

  bars.forEach((bar, index) => {
    if (isDemoPlaying) {
      bar.animate(
        [
          { transform: "scaleY(0.35)" },
          { transform: `scaleY(${0.5 + (index % 5) * 0.18})` },
          { transform: "scaleY(0.4)" }
        ],
        {
          duration: 450 + (index % 6) * 100,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out"
        }
      );
    } else {
      bar.getAnimations().forEach((animation) => {
        animation.cancel();
      });

      bar.style.transform = "scaleY(1)";
    }
  });
}


/* ---------- 17. FINAL CELEBRATION ---------- */

function showFinalCelebration() {
  missionCompleted = true;

  if (missionCounter) {
    missionCounter.textContent = "ALL MISSIONS COMPLETE";
  }

  if (progressBar) {
    progressBar.style.width = "100%";
  }

  if (progressText) {
    progressText.textContent = "100% COMPLETE";
  }

  if (progressTrack) {
    progressTrack.setAttribute("aria-valuenow", "100");
  }

  objectiveItems.forEach((item) => {
    item.classList.remove("active");
    item.classList.add("completed");
  });

  updateSystemStatus("ALL OBJECTIVES COMPLETE");

  missionContent.innerHTML = `
    <p class="terminal-label">
      [SUCCESS] ALL OBJECTIVES COMPLETED
    </p>

    <h2>
      VERSION 2.5:
      <span style="color:var(--green)">UNLOCKED.</span>
      🎉
    </h2>

    <p>
      Twenty-five years of evolution.
      A lifetime of possibilities.
    </p>

    <div class="highlight-panel">
      <p>
        Happy birthday, Lelo. Keep learning,
        keep building, keep laughing, and keep becoming.
      </p>

      <p style="margin-top:12px">
        May the year ahead be full of blessings,
        opportunities and moments worth remembering.
      </p>
    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> final_report()</p>
      <p>All missions: COMPLETE</p>
      <p>Birthday wishes: DELIVERED</p>
      <p>Potential: ONGOING</p>
      <p class="success-line">
        [SYSTEM] End of mission. Beginning of a new chapter.
      </p>
    </div>

    <p style="
      color:var(--green);
      font-family:var(--font-code);
      font-size:12px;
    ">
      >>> END_OF_MISSION
    </p>
  `;

  launchConfetti(130);

  missionContent.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ---------- 18. CONFETTI ---------- */

function launchConfetti(numberOfPieces = 100) {
  if (!confettiContainer) {
    return;
  }

  const colours = [
    "#7ee787",
    "#79c0ff",
    "#d2a8ff",
    "#f2cc60",
    "#ff7b72",
    "#76e3da",
    "#ffffff"
  ];

  for (let i = 0; i < numberOfPieces; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;

    piece.style.backgroundColor =
      colours[Math.floor(Math.random() * colours.length)];

    piece.style.animationDelay = `${Math.random() * 1.2}s`;

    piece.style.animationDuration =
      `${2 + Math.random() * 2.5}s`;

    confettiContainer.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}


/* ---------- 19. SYSTEM STATUS ---------- */

function updateSystemStatus(message) {
  if (systemStatus) {
    systemStatus.textContent = message;
  }
}


/* ---------- 20. INITIAL STATE ---------- */

updateSystemStatus("ALL SYSTEMS GO");
