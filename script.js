
/* =====================================================
   PROJECT LELO | MISSION 25
   Birthday mission controller
   Six-stage data science experience
===================================================== */


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

const initializationForm = document.getElementById("initialization-form");
const terminalOutput = document.getElementById("terminal-output");
const subjectNameInput = document.getElementById("subject-name");
const subjectAgeInput = document.getElementById("subject-age");

const TOTAL_MISSIONS = 6;

let currentMission = 0;
let maxUnlockedMission = 0;
let missionStarted = false;
let missionCompleted = false;
let subjectName = "Lelo";
let subjectAge = 25;
let projectVersion = "2.5";
let audioEventsAttached = false;


/* ---------- 2. HELPER FUNCTIONS ---------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateSystemStatus(message) {
  if (systemStatus) {
    systemStatus.textContent = message;
  }
}


/* ---------- 3. MISSION DEFINITIONS ---------- */

const missions = [
  {
    title: "DECODE 2001",
    label: "MISSION 01",
    command: "acquire_historical_data()",
    button: "CONTINUE TO DATA CLEANING"
  },
  {
    title: "DATA CLEANING & EDA",
    label: "MISSION 02",
    command: "clean_and_explore(dataset)",
    button: "VISUALISE THE DATA"
  },
  {
    title: "DATA VISUALISATION",
    label: "MISSION 03",
    command: "visualise_observations()",
    button: "EVALUATE THE MODEL"
  },
  {
    title: "MODEL EVALUATION",
    label: "MISSION 04",
    command: "evaluate_model()",
    button: "INTERPRET THE RESULTS"
  },
  {
    title: "INTERPRETATION & INSIGHTS",
    label: "MISSION 05",
    command: "interpret_results()",
    button: "GENERATE THE FINAL REPORT"
  },
  {
    title: "FINAL BIRTHDAY REPORT",
    label: "MISSION 06",
    command: "generate_birthday_report()",
    button: "EXECUTE FINAL CELEBRATION"
  }
];


/* ---------- 4. INITIALIZATION ---------- */

function initializeProject() {
  if (!initializationForm || !terminalOutput || !startButton) {
    console.error("PROJECT LELO initialization elements are missing.");
    return;
  }

  startButton.hidden = true;
  startButton.disabled = true;

  initializationForm.addEventListener("submit", event => {
    event.preventDefault();

    const enteredName = String(subjectNameInput.value).trim();
    const enteredAge = Number(subjectAgeInput.value);

    if (
      !enteredName ||
      !Number.isInteger(enteredAge) ||
      enteredAge < 1 ||
      enteredAge > 120
    ) {
      terminalOutput.innerHTML = `
        <p class="code-error">
          &gt; ERROR: Enter a valid name and age.
        </p>
      `;
      return;
    }

    subjectName = enteredName.slice(0, 40);
    subjectAge = enteredAge;
    projectVersion = (enteredAge / 10).toFixed(1);

    const messages = [
      "> Initializing PROJECT LELO...",
      "> Loading Python environment...",
      "> Loading R analysis modules...",
      "> Establishing subject profile...",
      `> Subject identified: ${escapeHTML(subjectName)}`,
      `> Chronological age: ${subjectAge}`,
      `> Project version: ${projectVersion}`,
      "> Preparing data pipeline...",
      "> All systems ready."
    ];

    terminalOutput.innerHTML = `
      <p class="terminal-label">INITIALIZATION LOG</p>
      ${messages.map(message => `<p>${message}</p>`).join("")}
      <p class="success-line">[SUCCESS] Subject profile initialized.</p>
    `;

    const versionNumber = document.getElementById("version-number");

    if (versionNumber) {
      versionNumber.textContent = `v${projectVersion}`;
    }

    startButton.hidden = false;
    startButton.disabled = false;

    initializationForm.querySelector(
      'button[type="submit"]'
    ).disabled = false;

    updateSystemStatus("INITIALIZATION COMPLETE");
  });
}


/* ---------- 5. START THE MISSION ---------- */

function startMission() {
  if (!startButton || startButton.disabled || missionStarted) {
    return;
  }

  missionStarted = true;
  missionCompleted = false;
  currentMission = 0;
  maxUnlockedMission = 0;

  bootScreen.hidden = true;
  missionScreen.hidden = false;

  updateSystemStatus("MISSION INITIALIZED");
  renderMission();

  missionScreen.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

startButton.addEventListener("click", startMission);


/* ---------- 6. PROGRESS TRACKER ---------- */

function updateProgress() {
  const percentage = missionCompleted
    ? 100
    : Math.round((currentMission / TOTAL_MISSIONS) * 100);

  if (missionCounter) {
    missionCounter.textContent = missionCompleted
      ? "ALL MISSIONS COMPLETE"
      : `MISSION ${String(currentMission + 1).padStart(2, "0")} / ${TOTAL_MISSIONS}`;
  }

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", String(percentage));
  }

  if (progressTrack) {
    progressTrack.setAttribute("aria-valuenow", String(percentage));
  }

  if (progressText) {
    progressText.textContent = `${percentage}% COMPLETE`;
  }
}

function updateObjectives() {
  objectiveItems.forEach((item, index) => {
    const isCurrent = index === currentMission && !missionCompleted;
    const isUnlocked = index <= maxUnlockedMission;
    const isCompleted = missionCompleted || index < currentMission;

    item.classList.toggle("active", isCurrent);
    item.classList.toggle("completed", isCompleted);
    item.classList.toggle("locked", !isUnlocked);

    item.setAttribute("aria-current", isCurrent ? "step" : "false");
    item.setAttribute("aria-disabled", String(!isUnlocked));

    if (isUnlocked) {
      item.removeAttribute("tabindex");
      item.setAttribute("tabindex", "0");
    }
  });
}


/* ---------- 7. RENDER THE CURRENT MISSION ---------- */

function renderMission() {
  const mission = missions[currentMission];

  if (!mission || !missionContent) return;

  updateProgress();
  updateObjectives();
  updateSystemStatus(`RUNNING ${mission.label}`);

  let content = "";

  switch (currentMission) {
    case 0:
      content = renderDataAcquisition();
      break;

    case 1:
      content = renderDataCleaning();
      break;

    case 2:
      content = renderDataVisualisation();
      break;

    case 3:
      content = renderModelEvaluation();
      break;

    case 4:
      content = renderInsights();
      break;

    case 5:
      content = renderBirthdayReport();
      break;
  }

  missionContent.innerHTML = `
    <p class="terminal-label">
      &gt;&gt;&gt; ${mission.command}
    </p>

    ${content}

    <button
      type="button"
      id="next-mission"
      class="primary-button"
    >
      ${mission.button} →
    </button>
  `;

  document.getElementById("next-mission").addEventListener(
    "click",
    advanceMission
  );

  if (currentMission === 2) {
    setupAudioPlayer();
  }
}


/* ---------- 8. MISSION 01: DATA ACQUISITION ---------- */

function renderDataAcquisition() {
  return `
    <h2>DECODE <span style="color:var(--green)">2001</span></h2>

    <p>
      Every investigation begins with a question. Before analysing
      our subject, we explore a landmark year in scientific research.
    </p>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> import research_data</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> birth_year = 2001</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> research_topic = "human genome"</p>
      <p class="success-line">[SUCCESS] Historical context acquired.</p>
    </div>

    <div class="detail-grid">
      <article class="detail-card">
        <span class="card-label">RESEARCH YEAR</span>
        <span class="card-value">2001</span>
        <span class="card-description">
          A landmark year for human genome research.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">RESEARCH FIELD</span>
        <span class="card-value">GENOMICS</span>
        <span class="card-description">
          Studying the genetic information of organisms.
        </span>
      </article>
    </div>

    <div class="timeline">
      <article class="timeline-item">
        <span class="timeline-date">FEBRUARY 2001</span>
        <h3>The human genome comes into focus</h3>
        <p>
          Landmark draft analyses of the human genome were published
          in Nature and Science, helping researchers understand
          the human genetic blueprint.
        </p>
      </article>

      <article class="timeline-item">
        <span class="timeline-date">DECEMBER 2001</span>
        <h3>More of the code is decoded</h3>
        <p>
          A detailed analysis of chromosome 20 was published in Nature,
          contributing to scientific understanding of the genome.
        </p>
      </article>

      <article class="timeline-item">
        <span class="timeline-date">SUBJECT RECORD</span>
        <h3>Introducing ${escapeHTML(subjectName)}</h3>
        <p>
          The personal dataset begins here. Every subject has a story
          that extends beyond a collection of records.
        </p>
      </article>
    </div>

    <div class="info-panel">
      <p>
        <strong>WHY THIS MATTERS:</strong>
        Bioinformatics combines biology, statistics and computing
        to help researchers make sense of biological data.
        Good analysis begins by understanding the source.
      </p>
    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> inspect(data_source)</p>
      <p>source_status = "ACQUIRED"</p>
      <p>next_step = "DATA CLEANING"</p>
      <p class="success-line">[READY] Proceed to preprocessing.</p>
    </div>
  `;
}


/* ---------- 9. MISSION 02: DATA CLEANING & EDA ---------- */

function renderDataCleaning() {
  const rawDataset = [
    { feature: "Curiosity", value: "High" },
    { feature: "Coding & competitions", value: "Detected" },
    { feature: "Scientific interests", value: "Detected" },
    { feature: "Goofiness", value: "Confirmed" },
    { feature: "Smile effect", value: null }
  ];

  const missingValues = rawDataset.filter(
    record => record.value === null
  ).length;

  const cleanedDataset = rawDataset.map(record => ({
    feature: record.feature,
    value: record.value === null
      ? "Not objectively measured"
      : record.value
  }));

  return `
    <h2>DATA CLEANING &amp; EXPLORATION</h2>

    <p>
      Before building a model, we inspect the raw records, identify
      missing values and prepare the dataset for exploration.
    </p>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> import pandas as pd</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> df = load_subject_dataset()</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> df.head()</p>
      <p>   feature                 value</p>
      <p>0  curiosity               High</p>
      <p>1  coding                  Detected</p>
      <p>2  scientific_interests    Detected</p>
      <p>3  goofiness               Confirmed</p>
      <p>4  smile_effect            NaN</p>
      <p class="success-line">[OUTPUT] Initial records loaded.</p>
    </div>

    <div class="detail-grid">
      <article class="detail-card">
        <span class="card-label">RECORDS LOADED</span>
        <span class="card-value">${rawDataset.length}</span>
        <span class="card-description">
          Qualitative observations in the demonstration dataset.
        </span>
      </article>

      <article class="detail-card">
        <span class="card-label">MISSING VALUES</span>
        <span class="card-value">${missingValues}</span>
        <span class="card-description">
          One field cannot be objectively measured.
        </span>
      </article>
    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> df.isnull().sum()</p>
      <p>smile_effect    ${missingValues}</p>
      <p class="success-line">
        [SUCCESS] Missing data identified.
      </p>
    </div>

    <h3>Cleaned dataset</h3>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>FEATURE</th>
            <th>VALUE</th>
          </tr>
        </thead>

        <tbody>
          ${cleanedDataset.map(record => `
            <tr>
              <td>${escapeHTML(record.feature)}</td>
              <td>${escapeHTML(record.value)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="info-panel">
      <p>
        <strong>DATA QUALITY NOTE:</strong>
        Missing data should not automatically be replaced with
        an invented value. Here, the smile effect is a playful
        observation, not a measurable scientific variable.
      </p>
    </div>

    <h3>Exploratory observations</h3>

    <div class="detail-grid">
      ${cleanedDataset.map(record => `
        <article class="detail-card">
          <span class="card-label">${escapeHTML(record.feature)}</span>
          <span class="card-value">
            ${record.value === "Not objectively measured"
              ? "UNKNOWN"
              : escapeHTML(record.value.toUpperCase())}
          </span>
          <span class="card-description">
            ${record.value === "Not objectively measured"
              ? "Insufficient measurable evidence"
              : "Qualitative observation"}
          </span>
        </article>
      `).join("")}
    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> df.describe()</p>
      <p>qualitative_features = ${rawDataset.length}</p>
      <p>numeric_measurements = 0</p>
      <p>statistical_inference = "NOT APPLICABLE"</p>
      <p class="success-line">[READY] Proceed to visualisation.</p>
    </div>
  `;
}


/* ---------- 10. MISSION 03: DATA VISUALISATION ---------- */

function createWaveform() {
  return Array.from({ length: 36 }, (_, index) => {
    const height = 8 + ((index * 17 + 11) % 35);

    return `
      <span
        class="waveform-bar"
        style="
          display:block;
          flex:0 0 4px;
          height:${height}px;
          border-radius:4px;
          background:${
            index % 4 === 0
              ? "var(--purple)"
              : index % 3 === 0
                ? "var(--blue)"
                : "var(--green)"
          };
          opacity:0.8;
        "
      ></span>
    `;
  }).join("");
}

function renderDataVisualisation() {
  return `
    <h2>DATA VISUALISATION</h2>

    <p>
      Visualisations help make information easier to explore.
      This stage includes a waveform-inspired display and the
      soundtrack selected for the birthday mission.
    </p>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> import matplotlib.pyplot as plt</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> features = ["Curiosity", "Coding", "Goofiness"]</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> plot_features(features)</p>
      <p class="success-line">[OUTPUT] Visualisation module initialized.</p>
    </div>

    <article class="detail-card" style="margin:24px 0">
      <span class="card-label">AUDIO FEATURE // TRACK 001</span>

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
        " aria-hidden="true">♪</div>

        <div>
          <h3 style="font-size:17px">Chrome Heart Diaper Bag</h3>
          <p style="color:var(--muted);font-size:12px">
            Latto // Local audio file
          </p>
        </div>
      </div>

      <div
        id="audio-waveform"
        aria-label="Decorative audio waveform"
        style="
          display:flex;
          align-items:center;
          justify-content:center;
          gap:4px;
          height:70px;
          margin:20px 0;
          overflow:hidden;
        "
      >
        ${createWaveform()}
      </div>

      <audio id="lelo-audio" preload="metadata">
        <source
          src="Latto - Chrome Heart Diaper Bag (Audio).mp3"
          type="audio/mpeg"
        >
        Your browser does not support audio playback.
      </audio>

      <button
        id="play-audio-button"
        type="button"
        class="primary-button"
        style="width:100%"
        aria-pressed="false"
      >
        ▶ PLAY TRACK
      </button>

      <div style="margin-top:20px">
        <input
          id="audio-progress"
          type="range"
          min="0"
          max="100"
          value="0"
          step="0.1"
          aria-label="Song progress"
          style="width:100%;accent-color:var(--green)"
        >

        <div style="
          display:flex;
          justify-content:space-between;
          color:var(--muted);
          font-size:11px;
        ">
          <span id="audio-current-time">0:00</span>
          <span id="audio-duration">0:00</span>
        </div>
      </div>

      <p
        id="audio-player-status"
        role="status"
        style="
          margin-top:12px;
          color:var(--muted);
          font-size:11px;
          text-align:center;
        "
      >
        Ready to play. Press the button when you're ready.
      </p>
    </article>

    <div class="info-panel">
      <p>
        <strong>INTERPRETATION NOTE:</strong>
        This waveform is decorative, not a live frequency analysis.
        The qualitative observations are not scientifically measured
        personality scores.
      </p>
    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> visualisation_status()</p>
      <p>charts = "READY"</p>
      <p>audio_module = "LOADED"</p>
      <p>next_step = "MODEL EVALUATION"</p>
      <p class="success-line">[SUCCESS] Visualisation stage complete.</p>
    </div>
  `;
}


/* ---------- 11. AUDIO PLAYER ---------- */

function setupAudioPlayer() {
  const audio = document.getElementById("lelo-audio");
  const playButton = document.getElementById("play-audio-button");
  const progress = document.getElementById("audio-progress");
  const currentTimeDisplay = document.getElementById("audio-current-time");
  const durationDisplay = document.getElementById("audio-duration");
  const status = document.getElementById("audio-player-status");

  if (!audio || !playButton || !progress) return;

  function updateProgress() {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      progress.value = String((audio.currentTime / audio.duration) * 100);
    } else {
      progress.value = "0";
    }

    if (currentTimeDisplay) {
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }

    if (durationDisplay) {
      durationDisplay.textContent = formatTime(audio.duration);
    }
  }

  function setPlayingState(playing) {
    playButton.textContent = playing ? "Ⅱ PAUSE TRACK" : "▶ PLAY TRACK";
    playButton.setAttribute("aria-pressed", String(playing));
  }

  if (!audioEventsAttached) {
    playButton.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
        } catch (error) {
          if (status) {
            status.textContent =
              "Unable to play audio. Check that the MP3 file is in the project folder.";
          }
        }
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", () => {
      setPlayingState(true);
      if (status) status.textContent = "PLAYING AUDIO...";
    });

    audio.addEventListener("pause", () => {
      setPlayingState(false);

      if (status && !audio.ended) {
        status.textContent = "AUDIO PAUSED.";
      }
    });

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("durationchange", updateProgress);

    audio.addEventListener("ended", () => {
      setPlayingState(false);
      progress.value = "0";

      if (status) status.textContent = "TRACK COMPLETE.";

      if (currentTimeDisplay) currentTimeDisplay.textContent = "0:00";
    });

    audio.addEventListener("error", () => {
      if (status) {
        status.textContent =
          "Audio file unavailable. Check the filename and folder location.";
      }
    });

    progress.addEventListener("input", () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime =
          (Number(progress.value) / 100) * audio.duration;
      }
    });

    audioEventsAttached = true;
  }

  updateProgress();
}


/* ---------- 12. MISSION 04: MODEL EVALUATION ---------- */

function renderModelEvaluation() {
  return `
    <section class="mission-panel">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">model_evaluation.py</span>
        </div>

        <div class="terminal-body">
          <p class="code-comment"># STAGE 04: MODEL EVALUATION</p>

          <p>
            <span class="code-purple">def</span>
            <span class="code-green">evaluate_model</span>(subject):
          </p>

          <p class="code-indent">
            chronological_age = ${subjectAge}
          </p>

          <p class="code-indent">
            goofiness = "STILL DETECTED"
          </p>

          <p class="code-indent">
            smile_effect = "UNQUANTIFIABLE"
          </p>

          <hr class="terminal-divider">

          <p class="code-comment">
            # Evaluating the questionable adulthood classifier...
          </p>

          <div class="terminal-output">
            <p>&gt; Subject profile loaded.</p>
            <p>&gt; Chronological age: ${subjectAge}.</p>
            <p>&gt; Warning: goofiness is not a scientific metric.</p>
            <p>&gt; Warning: maturity cannot be measured from this dataset.</p>
          </div>
        </div>
      </div>

      <div class="mission-card">
        <p class="section-label">INTERACTIVE MODEL TEST</p>

        <h2>Is the birthday subject officially an adult?</h2>

        <p>
          The subject has reached the age of ${subjectAge}.
          However, this questionable model still detects substantial
          levels of goofiness.
        </p>

        <p class="code-comment"># Select your prediction:</p>

        <div class="answer-buttons">
          <button
            class="answer-button"
            data-maturity-answer="yes"
            type="button"
          >
            True
          </button>

          <button
            class="answer-button"
            data-maturity-answer="no"
            type="button"
          >
            False
          </button>
        </div>

        <div
          id="maturity-result"
          class="terminal-output"
          aria-live="polite"
        >
          <p>&gt; Awaiting user input...</p>
        </div>

        <p class="small-note">
          This is a playful birthday quiz, not a scientific assessment
          of maturity.
        </p>
      </div>
    </section>
  `;
}

function handleMaturityAnswer(answer) {
  const result = document.getElementById("maturity-result");

  if (!result) return;

  if (answer === "yes") {
    result.innerHTML = `
      <p>&gt; Prediction received: TRUE</p>
      <p>&gt; Chronological age check: PASSED.</p>
      <p>&gt; Goofiness check: STILL UNDER INVESTIGATION.</p>
      <p class="code-green">
        Result: Adult status confirmed. Seriousness not guaranteed.
      </p>
    `;
  } else {
    result.innerHTML = `
      <p>&gt; Prediction received: FALSE</p>
      <p>&gt; Rechecking chronological age...</p>
      <p>&gt; Age confirmed: ${subjectAge}.</p>
      <p class="code-green">
        Result: The subject is an adult. The model remains suspicious.
      </p>
    `;
  }

  launchConfetti(25);
}


/* ---------- 13. MISSION 05: INTERPRETATION & INSIGHTS ---------- */

function renderInsights() {
  return `
    <section class="mission-panel">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">insights.R</span>
        </div>

        <div class="terminal-body">
          <p class="code-comment"># STAGE 05: INTERPRET THE RESULTS</p>

          <p>
            <span class="code-purple">library</span>(tidyverse)
          </p>

          <p>
            <span class="code-blue">insights</span>
            <span class="code-purple">&lt;-</span>
            tibble(
          </p>

          <p class="code-indent">
            curiosity = <span class="code-green">"HIGH"</span>,
          </p>

          <p class="code-indent">
            ambition = <span class="code-green">"IN DEVELOPMENT"</span>,
          </p>

          <p class="code-indent">
            potential = <span class="code-green">"EXPANDING"</span>,
          </p>

          <p class="code-indent">
            future = <span class="code-green">"OPEN TO POSSIBILITIES"</span>
          </p>

          <p>)</p>

          <div class="terminal-output">
            <p># A tibble: 1 × 4</p>
            <p>curiosity: HIGH</p>
            <p>ambition: IN DEVELOPMENT</p>
            <p>potential: EXPANDING</p>
            <p>future: OPEN TO POSSIBILITIES</p>
          </div>
        </div>
      </div>

      <div class="insight-grid">
        <article class="insight-card">
          <span class="insight-icon">01</span>
          <h3>Curiosity</h3>
          <p>
            Keep asking questions, exploring ideas and learning
            things that challenge you.
          </p>
          <span class="insight-status">STATUS: ACTIVE</span>
        </article>

        <article class="insight-card">
          <span class="insight-icon">02</span>
          <h3>Growth</h3>
          <p>
            Every project, competition and difficult problem can
            teach you something new.
          </p>
          <span class="insight-status">STATUS: ONGOING</span>
        </article>

        <article class="insight-card">
          <span class="insight-icon">03</span>
          <h3>Possibility</h3>
          <p>
            You do not need every answer at 25. There is still
            so much to discover.
          </p>
          <span class="insight-status">STATUS: UNBOUNDED</span>
        </article>
      </div>

      <div class="mission-card">
        <p class="section-label">INTERPRETATION SUMMARY</p>

        <h2>What does the data actually tell us?</h2>

        <p>
          A dataset can reveal patterns, but it cannot measure
          everything that makes a person who they are.
        </p>

        <p>
          The observations cannot predict every achievement,
          opportunity, friendship or beautiful moment waiting
          in your future.
        </p>

        <div class="terminal-output">
          <p>&gt; Analysis complete.</p>
          <p>&gt; Potential: not limited to model output.</p>
          <p>&gt; Future: not predetermined.</p>
          <p>&gt; Recommendation: keep growing.</p>
        </div>
      </div>
    </section>
  `;
}


/* ---------- 14. MISSION 06: FINAL BIRTHDAY REPORT ---------- */

function renderBirthdayReport() {
  const safeName = escapeHTML(subjectName);

  return `
    <section class="mission-panel birthday-report">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">final_report.py</span>
        </div>

        <div class="terminal-body">
          <p class="code-comment"># STAGE 06: FINAL REPORT</p>

          <p>
            <span class="code-purple">def</span>
            <span class="code-green">generate_birthday_report</span>(subject):
          </p>

          <p class="code-indent">report = {</p>
          <p class="code-indent">"subject": "${safeName}",</p>
          <p class="code-indent">"age": ${subjectAge},</p>
          <p class="code-indent">"version": "${escapeHTML(projectVersion)}",</p>
          <p class="code-indent">"status": "READY FOR NEXT CHAPTER"</p>
          <p class="code-indent">}</p>

          <div class="terminal-output">
            <p>&gt; Generating final report...</p>
            <p>&gt; Birthday subject identified.</p>
            <p>&gt; Personal message compiled.</p>
            <p>&gt; Prayer module loaded.</p>
            <p class="code-green">&gt; Report status: COMPLETE.</p>
          </div>
        </div>
      </div>

      <article class="birthday-message-card">
        <p class="section-label">
          PERSONAL MESSAGE // ${escapeHTML(projectVersion)}
        </p>

        <h2>Happy birthday, ${safeName}! 🎂</h2>

        <p>
          I hope you have a beautiful day and enjoy every moment of it.
          May God bless you with many more years, filled with joy,
          prosperity, growth and even greater achievements.
        </p>

        <p>
          May your life always be covered by the Lord, and may His
          protection, grace and favour follow you wherever you go.
          I pray this new chapter brings you closer to all you're
          working towards and everything God has in store for you.
        </p>

        <p>
          Have an amazing birthday, ${safeName}. 💚
        </p>
      </article>

      <div class="terminal-window report-footer">
        <div class="terminal-header">
          <span class="terminal-title">report_summary.txt</span>
        </div>

        <div class="terminal-body">
          <p class="code-comment"># FINAL OBSERVATIONS</p>
          <p>Subject: ${safeName}</p>
          <p>Age: ${subjectAge}</p>
          <p>Project version: ${escapeHTML(projectVersion)}</p>
          <p>Potential: STILL DEVELOPING</p>
          <p>Next chapter: READY TO BEGIN</p>

          <hr class="terminal-divider">

          <p class="code-green">PROCESS COMPLETE. HAPPY BIRTHDAY!</p>
        </div>
      </div>

      <p>
        Six stages processed. One birthday celebrated.
        The next chapter is yours to write.
      </p>
    </section>
  `;
}


/* ---------- 15. MISSION NAVIGATION ---------- */

function advanceMission() {
  if (currentMission < TOTAL_MISSIONS - 1) {
    currentMission += 1;
    maxUnlockedMission = Math.max(maxUnlockedMission, currentMission);
    renderMission();

    missionContent.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else {
    showFinalCelebration();
  }
}

function openObjective(index) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index > maxUnlockedMission ||
    index >= TOTAL_MISSIONS ||
    missionCompleted
  ) {
    return;
  }

  currentMission = index;
  renderMission();
}

document.addEventListener("click", event => {
  const answerButton = event.target.closest("[data-maturity-answer]");

  if (answerButton) {
    handleMaturityAnswer(answerButton.dataset.maturityAnswer);
    return;
  }

  const objective = event.target.closest(".objective-item");

  if (objective) {
    openObjective(Number(objective.dataset.objective));
  }
});

document.addEventListener("keydown", event => {
  const objective = event.target.closest(".objective-item");

  if (
    objective &&
    (event.key === "Enter" || event.key === " ")
  ) {
    event.preventDefault();
    openObjective(Number(objective.dataset.objective));
  }
});


/* ---------- 16. FINAL CELEBRATION ---------- */

function showFinalCelebration() {
  missionCompleted = true;

  updateProgress();
  updateObjectives();
  updateSystemStatus("ALL SYSTEMS GO");

  if (!missionContent) return;

  missionContent.innerHTML = `
    <section class="mission-panel final-screen">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">process_complete.py</span>
        </div>

        <div class="terminal-body">
          <p class="code-comment"># EXECUTION SUMMARY</p>
          <p>&gt; Data acquisition: COMPLETE</p>
          <p>&gt; Data cleaning: COMPLETE</p>
          <p>&gt; Visualisation: COMPLETE</p>
          <p>&gt; Model evaluation: COMPLETE</p>
          <p>&gt; Interpretation: COMPLETE</p>
          <p>&gt; Birthday report: DELIVERED</p>

          <hr class="terminal-divider">

          <p class="code-green">
            Congratulations, ${escapeHTML(subjectName)}!
          </p>

          <p>
            You have reached the end of this mission.
            Your next chapter is just beginning.
          </p>

          <p class="code-comment"># END OF PROGRAM</p>
        </div>
      </div>

      <h2>MISSION ACCOMPLISHED 🎉</h2>

      <p>
        Happy ${subjectAge}th birthday, ${escapeHTML(subjectName)}!
      </p>

      <p>
        May this year bring you closer to your dreams,
        with God's grace guiding you along the way.
      </p>

      <p>
        Keep learning. Keep growing. Keep becoming.
      </p>

      <button
        type="button"
        id="restart-mission-button"
        class="primary-button"
      >
        RUN MISSION AGAIN
      </button>
    </section>
  `;

  document.getElementById("restart-mission-button").addEventListener(
    "click",
    restartMission
  );

  launchConfetti(120);

  missionContent.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function restartMission() {
  const audio = document.getElementById("lelo-audio");

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  currentMission = 0;
  maxUnlockedMission = 0;
  missionCompleted = false;

  renderMission();
}


/* ---------- 17. CONFETTI EFFECT ---------- */

function launchConfetti(amount = 60) {
  if (!confettiContainer) return;

  const colours = [
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
    "#facc15",
    "#f9fafb"
  ];

  for (let index = 0; index < amount; index++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;

    piece.style.backgroundColor =
      colours[Math.floor(Math.random() * colours.length)];

    piece.style.animationDelay = `${Math.random() * 1.5}s`;

    piece.style.animationDuration =
      `${2 + Math.random() * 2}s`;

    piece.style.setProperty(
      "--confetti-drift",
      `${Math.random() * 180 - 90}px`
    );

    confettiContainer.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, 5000);
  }
}


/* ---------- 18. STARTUP ---------- */

document.addEventListener("DOMContentLoaded", () => {
  initializeProject();
  updateSystemStatus("AWAITING INITIALIZATION");
});
