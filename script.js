/* ==========================================
   PROJECT LELO | MISSION 25
   Mission controller, interactions & effects
   Build: data-science workflow update
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

let maxUnlockedMission = 0;
let maturityAnswerRevealed = false;
let isDemoPlaying = false;

// Information collected during initialization.
let subjectName = "Lelo";
let subjectAge = 25;
let projectVersion = "2.5";

function subjectNameInputSafe(value) {
  return String(value).trim().slice(0, 40);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}


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
    title: "DATA CLEANING & EDA",
    label: "MISSION 02",
    command: "clean_and_explore(dataset)",
    description:
      "Inspect the subject dataset, handle missing values, and explore the observations before drawing conclusions.",
    button: "VISUALISE THE DATA"
  },
  {
    title: "DATA VISUALISATION",
    label: "MISSION 03",
    command: "visualise_observations()",
    description:
      "Turn observations into visual patterns. The soundtrack is the audio feature of this dashboard, with a waveform-inspired display and a playable track.",
    button: "EVALUATE THE MODEL"
  },
  {
    title: "MODEL EVALUATION",
    label: "MISSION 04",
    command: "evaluate_model()",
    description:
      "Test the model, inspect its limitations, and investigate the highly questionable Medulla Incident diagnostic.",
    button: "INTERPRET THE RESULTS"
  },
  {
    title: "INTERPRETATION & INSIGHTS",
    label: "MISSION 05",
    command: "interpret_results()",
    description:
      "Translate the analysis into meaningful insights, while remembering that no model can determine a person's future.",
    button: "GENERATE THE FINAL REPORT"
  },
  {
    title: "FINAL REPORT",
    label: "MISSION 06",
    command: "generate_birthday_report()",
    description:
      "All stages have been processed. Generate the final report to reveal the birthday message behind the project.",
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

  // Connect the real audio player in Mission 03.
  if (currentMission === 2) {
    setupAudioPlayer();
  }
}


/* ---------- 5. MISSION 01: DATA ACQUISITION ---------- */

function renderGenomeMission() {
  return `
    <h2>DECODE <span style="color:var(--green)">2001</span></h2>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> import research_data</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> birth_year = 2001</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> research_topic = "human genome"</p>
      <p class="success-line">[SUCCESS] Historical context acquired.</p>
    </div>

    <p>
      Before analysing any dataset, a data scientist needs to
      understand where the data came from and why it matters.
      So, our investigation begins in 2001.
    </p>

    <div class="detail-grid">

      <article class="detail-card">
        <span class="card-label">DATA SOURCE</span>
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
          in Nature and Science, giving researchers a clearer picture
          of the human genetic blueprint.
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
        <span class="timeline-date">SUBJECT RECORD</span>
        <h3>Enter ${escapeHTML(subjectName)}</h3>
        <p>
          One more story began in ${subjectAge}.
          The dataset is about to become a little more personal.
        </p>
      </article>

    </div>

    <div class="info-panel">
      <p>
        <strong>WHY THIS MATTERS:</strong>
        Bioinformatics combines biology, statistics and computing
        to help researchers make sense of biological data.
        It demonstrates how different fields can work together
        to answer difficult questions.
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
/* ---------- 6. MISSION 02: DATA CLEANING & EDA ---------- */

function renderSubjectAnalysis() {
  const observations = [
    {
      feature: "Curiosity",
      value: "HIGH",
      status: "OBSERVED"
    },
    {
      feature: "Coding & competitions",
      value: "DETECTED",
      status: "OBSERVED"
    },
    {
      feature: "Scientific interests",
      value: "DETECTED",
      status: "OBSERVED"
    },
    {
      feature: "Goofiness",
      value: "CONFIRMED",
      status: "PERSONAL OBSERVATION"
    },
    {
      feature: "Smile effect",
      value: "SIGNIFICANT",
      status: "BIASED RESEARCHER"
    }
  ];

  const rawDataset = [
    { feature: "Curiosity", value: "High" },
    { feature: "Coding", value: "Yes" },
    { feature: "Science", value: "Yes" },
    { feature: "Goofiness", value: "Yes" },
    { feature: "Smile effect", value: null }
  ];

  const missingValues = rawDataset.filter(
    (record) => record.value === null
  ).length;

  const cleanedDataset = rawDataset.map((record) => ({
    feature: record.feature,
    value:
      record.value === null
        ? "Not objectively measured"
        : record.value
  }));

  return `
    <h2>DATA CLEANING & EXPLORATION</h2>

    <p>
      Before building a model, we need to understand the data.
      First, we inspect the raw records, identify missing values
      and prepare the dataset for exploration.
    </p>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> import pandas as pd</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> df = load_subject_dataset()</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> df.head()</p>
      <p>   feature                 value</p>
      <p>0  curiosity               High</p>
      <p>1  coding                  Yes</p>
      <p>2  science                 Yes</p>
      <p>3  goofiness               Yes</p>
      <p>4  smile_effect            NaN</p>
      <p class="success-line">[OUTPUT] Initial records loaded.</p>
    </div>

    <div class="detail-grid">

      <article class="detail-card">
        <span class="card-label">RECORDS LOADED</span>
        <span class="card-value">${rawDataset.length}</span>
        <span class="card-description">
          Playful observations in the demonstration dataset.
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
      <p><span class="prompt">&gt;&gt;&gt;</span> df["smile_effect"].fillna("Not objectively measured")</p>
      <p class="success-line">[SUCCESS] Missing data handled transparently.</p>
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
          ${cleanedDataset.map((record) => `
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
        a made-up value. Here, the smile effect is a joke from
        a biased researcher, not a measurable scientific variable.
      </p>
    </div>

    <h3>Exploratory observations</h3>

    <p>
      The data is now ready for a first look. These are playful,
      qualitative observations rather than measured personality scores.
    </p>

    <div class="detail-grid">
      ${observations.map((item) => `
        <article class="detail-card">
          <span class="card-label">
            ${escapeHTML(item.feature)}
          </span>
          <span class="card-value">
            ${escapeHTML(item.value)}
          </span>
          <span class="card-description">
            ${escapeHTML(item.status)}
          </span>
        </article>
      `).join("")}
    </div>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> df.describe()</p>
      <p>qualitative_features = ${observations.length}</p>
      <p>numeric_measurements = 0</p>
      <p>statistical_inference = "NOT APPLICABLE"</p>
      <p class="success-line">[READY] Proceed to visualisation.</p>
    </div>

    <p style="
      color:var(--green);
      font-family:var(--font-code);
      font-size:12px;
    ">
      # Clean data. Honest assumptions. Better questions.
    </p>
  `;
}


/* ---------- 7. MISSION 03: DATA VISUALISATION ---------- */

function renderSoundtrack() {
  return `
    <h2>DATA VISUALISATION</h2>

    <p>
      Analysis becomes easier to explore when information is presented
      visually. This module combines a waveform-inspired display with
      the soundtrack selected for the birthday mission.
    </p>

    <div class="terminal-output">
      <p><span class="prompt">&gt;&gt;&gt;</span> import matplotlib.pyplot as plt</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> features = ["Curiosity", "Coding", "Goofiness"]</p>
      <p><span class="prompt">&gt;&gt;&gt;</span> plot_features(features)</p>
      <p class="success-line">[OUTPUT] Visualisation module initialized.</p>
    </div>

    <div class="detail-card" style="margin:24px 0">

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
        " aria-hidden="true">
          ♪
        </div>

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

    </div>

    <div class="info-panel">
      <p>
        <strong>INTERPRETATION NOTE:</strong>
        The waveform is decorative, not a live frequency analysis.
        The song is the audio feature of this module. The personal
        observations above are not scientifically measured variables.
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


/* ---------- DECORATIVE WAVEFORM ---------- */

function createWaveform() {
  let bars = "";

  for (let i = 0; i < 36; i++) {
    const height = 8 + ((i * 17 + 11) % 29);

    bars += `
      <span
        class="wave-bar"
        style="
          display:block;
          flex:0 0 4px;
          height:${height}px;
          border-radius:4px;
          background:${
            i % 4 === 0
              ? "var(--purple)"
              : i % 3 === 0
                ? "var(--blue)"
                : "var(--green)"
          };
          opacity:0.8;
          transform-origin:center;
        "
      ></span>
    `;
  }

  return bars;
}
function renderMaturityTest() {
    return `
        <section class="mission-panel">

            <div class="terminal-window">
                <div class="terminal-header">
                    <span class="terminal-dot red"></span>
                    <span class="terminal-dot yellow"></span>
                    <span class="terminal-dot green"></span>
                    <span class="terminal-title">
                        model_evaluation.py
                    </span>
                </div>

                <div class="terminal-body">
                    <p class="code-comment">
                        # STAGE 04: MODEL EVALUATION
                    </p>

                    <p>
                        <span class="code-purple">from</span>
                        sklearn.metrics
                        <span class="code-purple">import</span>
                        accuracy_score
                    </p>

                    <p>
                        <span class="code-purple">def</span>
                        <span class="code-green">evaluate_model</span>
                        (predictions, actual_values):
                    </p>

                    <p class="code-indent">
                        accuracy = accuracy_score(
                        actual_values, predictions)
                    </p>

                    <p class="code-indent">
                        <span class="code-purple">return</span>
                        accuracy
                    </p>

                    <hr class="terminal-divider">

                    <p class="code-comment">
                        # Loading the adulthood classifier...
                    </p>

                    <p>
                        <span class="code-blue">model</span>
                        = <span class="code-green">"LELO_v2.5"</span>
                    </p>

                    <p>
                        <span class="code-blue">chronological_age</span>
                        = ${subjectAge}
                    </p>

                    <p>
                        <span class="code-blue">goofiness_level</span>
                        = <span class="code-green">"STILL DETECTED"</span>
                    </p>

                    <p>
                        <span class="code-blue">smile_effect</span>
                        = <span class="code-green">"UNQUANTIFIABLE"</span>
                    </p>

                    <div class="terminal-output">
                        <p>&gt; Model loaded successfully.</p>
                        <p>&gt; Testing the available evidence...</p>
                        <p>&gt; Warning: adulthood cannot be measured using goofiness.</p>
                        <p>&gt; Warning: smile-related data exceeds available metrics.</p>
                    </div>
                </div>
            </div>

            <div class="mission-card">
                <p class="section-label">INTERACTIVE MODEL TEST</p>

                <h2>Is the birthday subject officially an adult?</h2>

                <p>
                    The dataset confirms that the subject has reached
                    the age of ${subjectAge}. However, this highly
                    questionable model also detects substantial levels
                    of goofiness.
                </p>

                <p class="code-comment">
                    # Select your prediction:
                </p>

                <div class="answer-buttons">
                    <button
                        class="answer-button"
                        data-maturity-answer="yes"
                        type="button">
                        True
                    </button>

                    <button
                        class="answer-button"
                        data-maturity-answer="no"
                        type="button">
                        False
                    </button>
                </div>

                <div
                    id="maturity-result"
                    class="terminal-output"
                    aria-live="polite">
                    <p>
                        &gt; Awaiting user input...
                    </p>
                </div>

                <p class="small-note">
                    Note: this is a playful birthday quiz, not a
                    scientific assessment of maturity.
                </p>
            </div>

        </section>
    `;
}
function renderNextChapter() {
    return `
        <section class="mission-panel">

            <div class="terminal-window">
                <div class="terminal-header">
                    <span class="terminal-dot red"></span>
                    <span class="terminal-dot yellow"></span>
                    <span class="terminal-dot green"></span>
                    <span class="terminal-title">
                        insights.R
                    </span>
                </div>

                <div class="terminal-body">
                    <p class="code-comment">
                        # STAGE 05: INTERPRET THE RESULTS
                    </p>

                    <p>
                        <span class="code-purple">library</span>
                        (tidyverse)
                    </p>

                    <p>
                        <span class="code-blue">insights</span>
                        <span class="code-purple"> &lt;- </span>
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

                    <p>
                        <span class="code-purple">print</span>(insights)
                    </p>

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

                <div class="insight-card">
                    <span class="insight-icon">01</span>
                    <h3>Curiosity</h3>
                    <p>
                        Keep asking questions, exploring ideas
                        and learning things that challenge you.
                    </p>
                    <span class="insight-status">
                        STATUS: ACTIVE
                    </span>
                </div>

                <div class="insight-card">
                    <span class="insight-icon">02</span>
                    <h3>Growth</h3>
                    <p>
                        Every project, competition and difficult
                        problem can teach you something new.
                    </p>
                    <span class="insight-status">
                        STATUS: ONGOING
                    </span>
                </div>

                <div class="insight-card">
                    <span class="insight-icon">03</span>
                    <h3>Possibility</h3>
                    <p>
                        You do not need to have every answer
                        at 25. There is still so much to discover.
                    </p>
                    <span class="insight-status">
                        STATUS: UNBOUNDED
                    </span>
                </div>

            </div>

            <div class="mission-card">
                <p class="section-label">
                    INTERPRETATION SUMMARY
                </p>

                <h2>What does the data actually tell us?</h2>

                <p>
                    A dataset can reveal patterns, but it cannot
                    measure everything that makes a person who
                    they are.
                </p>

                <p>
                    The numbers can describe a few observations.
                    They cannot predict every achievement,
                    opportunity, friendship or beautiful moment
                    waiting in your future.
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

function renderBirthdayMission() {
    const safeName = escapeHTML(subjectName);

    return `
        <section class="mission-panel birthday-report">

            <div class="terminal-window">
                <div class="terminal-header">
                    <span class="terminal-dot red"></span>
                    <span class="terminal-dot yellow"></span>
                    <span class="terminal-dot green"></span>
                    <span class="terminal-title">
                        final_report.py
                    </span>
                </div>

                <div class="terminal-body">
                    <p class="code-comment">
                        # STAGE 06: FINAL REPORT
                    </p>

                    <p>
                        <span class="code-purple">def</span>
                        <span class="code-green">generate_birthday_report</span>
                        (subject):
                    </p>

                    <p class="code-indent">
                        report = {
                    </p>

                    <p class="code-indent">
                        "subject": "${safeName}",
                    </p>

                    <p class="code-indent">
                        "age": ${subjectAge},
                    </p>

                    <p class="code-indent">
                        "version": "${escapeHTML(projectVersion)}",
                    </p>

                    <p class="code-indent">
                        "status": "READY FOR NEXT CHAPTER"
                    </p>

                    <p class="code-indent">}</p>

                    <p class="code-indent">
                        <span class="code-purple">return</span> report
                    </p>

                    <p>
                        report =
                        generate_birthday_report("${safeName}")
                    </p>

                    <div class="terminal-output">
                        <p>&gt; Generating final report...</p>
                        <p>&gt; Birthday subject identified.</p>
                        <p>&gt; Personal message compiled.</p>
                        <p>&gt; Prayer module loaded.</p>
                        <p>&gt; Report status: COMPLETE.</p>
                    </div>
                </div>
            </div>

            <div class="birthday-message-card">
                <p class="section-label">
                    PERSONAL MESSAGE // ${escapeHTML(projectVersion)}
                </p>

                <h2>Happy birthday, ${safeName}! 🎂</h2>

                <p>
                    I hope you have a beautiful day and enjoy every
                    moment of it. May God bless you with many more
                    years, filled with joy, prosperity, growth and
                    even greater achievements.
                </p>

                <p>
                    May your life always be covered by the Lord,
                    and may His protection, grace and favour follow
                    you wherever you go. I pray this new chapter
                    brings you closer to all you're working towards
                    and everything God has in store for you.
                </p>

                <p>
                    Have an amazing birthday, ${safeName}. 💚
                </p>
            </div>

            <div class="terminal-window report-footer">
                <div class="terminal-header">
                    <span class="terminal-title">
                        report_summary.txt
                    </span>
                </div>

                <div class="terminal-body">
                    <p class="code-comment">
                        # FINAL OBSERVATIONS
                    </p>

                    <p>Subject: ${safeName}</p>
                    <p>Age: ${subjectAge}</p>
                    <p>Project version: ${escapeHTML(projectVersion)}</p>
                    <p>Potential: STILL DEVELOPING</p>
                    <p>Next chapter: READY TO BEGIN</p>

                    <hr class="terminal-divider">

                    <p class="code-green">
                        PROCESS COMPLETE. HAPPY BIRTHDAY!
                    </p>
                </div>
            </div>

            <button
                type="button"
                id="final-celebration-button"
                class="primary-button">
                EXECUTE FINAL CELEBRATION
            </button>

        </section>
    `;
}


// ================================================
// MISSION NAVIGATION
// ================================================

function advanceMission() {
    if (currentMission < TOTAL_MISSIONS - 1) {
        currentMission++;
        maxUnlockedMission = Math.max(
            maxUnlockedMission,
            currentMission
        );

        renderMission();
    } else {
        showFinalCelebration();
    }
}


function updateProgress() {
    const completedCount = currentMission;
    const percentage = Math.round(
        (completedCount / TOTAL_MISSIONS) * 100
    );

    if (missionCounter) {
        missionCounter.textContent =
            `MISSION ${String(currentMission + 1).padStart(2, "0")} / ${TOTAL_MISSIONS}`;
    }

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute(
            "aria-valuenow",
            String(percentage)
        );
    }

    if (progressText) {
        progressText.textContent = `${percentage}%`;
    }

    if (progressTrack) {
        progressTrack.setAttribute(
            "aria-valuenow",
            String(percentage)
        );
    }
}


function updateObjectives() {
    objectiveItems.forEach((item, index) => {
        const isCurrent = index === currentMission;
        const isUnlocked = index <= maxUnlockedMission;
        const isCompleted = index < currentMission;

        item.classList.toggle("active", isCurrent);
        item.classList.toggle("completed", isCompleted);
        item.classList.toggle("locked", !isUnlocked);

        item.setAttribute(
            "aria-current",
            isCurrent ? "step" : "false"
        );

        if (isUnlocked) {
            item.removeAttribute("aria-disabled");
        } else {
            item.setAttribute("aria-disabled", "true");
        }
    });
}


function openObjective(index) {
    if (
        Number.isInteger(index) &&
        index >= 0 &&
        index <= maxUnlockedMission &&
        index < TOTAL_MISSIONS
    ) {
        currentMission = index;
        renderMission();
    }
}


// ================================================
// MATURITY QUIZ INTERACTION
// ================================================

function handleMaturityAnswer(answer) {
    const result = document.getElementById("maturity-result");

    if (!result) return;

    maturityAnswerRevealed = true;

    const isCorrect = answer === "yes";

    result.innerHTML = isCorrect
        ? `
            <p>&gt; Prediction received: TRUE</p>
            <p>&gt; Chronological age check: PASSED.</p>
            <p>&gt; Goofiness check: STILL UNDER INVESTIGATION.</p>
            <p class="code-green">
                Result: Adult status confirmed. Seriousness not guaranteed.
            </p>
        `
        : `
            <p>&gt; Prediction received: FALSE</p>
            <p>&gt; Rechecking chronological age...</p>
            <p>&gt; Age confirmed: ${subjectAge}.</p>
            <p class="code-green">
                Result: The subject is an adult. The model remains suspicious.
            </p>
        `;

    launchConfetti(30);
}


// ================================================
// FINAL CELEBRATION
// ================================================

function showFinalCelebration() {
    missionCompleted = true;

    if (progressBar) {
        progressBar.style.width = "100%";
        progressBar.setAttribute("aria-valuenow", "100");
    }

    if (progressText) {
        progressText.textContent = "100%";
    }

    if (progressTrack) {
        progressTrack.setAttribute("aria-valuenow", "100");
    }

    if (missionCounter) {
        missionCounter.textContent = "ALL MISSIONS COMPLETE";
    }

    if (systemStatus) {
        systemStatus.textContent = "ALL SYSTEMS GO";
    }

    if (missionContent) {
        missionContent.innerHTML = `
            <section class="mission-panel final-screen">
                <div class="terminal-window">
                    <div class="terminal-header">
                        <span class="terminal-dot red"></span>
                        <span class="terminal-dot yellow"></span>
                        <span class="terminal-dot green"></span>
                        <span class="terminal-title">
                            process_complete.py
                        </span>
                    </div>

                    <div class="terminal-body">
                        <p class="code-comment">
                            # EXECUTION SUMMARY
                        </p>

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

                        <p class="code-comment">
                            # END OF PROGRAM
                        </p>
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

                <button
                    type="button"
                    id="restart-mission-button"
                    class="primary-button">
                    RUN MISSION AGAIN
                </button>
            </section>
        `;

        const restartButton = document.getElementById(
            "restart-mission-button"
        );

        if (restartButton) {
            restartButton.addEventListener("click", () => {
                currentMission = 0;
                missionCompleted = false;
                maturityAnswerRevealed = false;
                maxUnlockedMission = 0;

                renderMission();
            });
        }
    }

    updateObjectives();
    launchConfetti(120);
}


// ================================================
// CONFETTI EFFECT
// ================================================

function launchConfetti(amount = 60) {
    if (!confettiContainer) return;

    const colours = [
        "#8b5cf6",
        "#3b82f6",
        "#22c55e",
        "#facc15",
        "#f9fafb"
    ];

    for (let i = 0; i < amount; i++) {
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


// ================================================
// SYSTEM STATUS
// ================================================

function updateSystemStatus(message) {
    if (systemStatus) {
        systemStatus.textContent = message;
    }
}


// ================================================
// AUDIO PLAYER
// ================================================

function setupAudioPlayer() {
    const audio = document.getElementById("birthday-audio");
    const playButton = document.getElementById("play-audio-button");
    const progress = document.getElementById("audio-progress");
    const currentTimeDisplay =
        document.getElementById("audio-current-time");
    const durationDisplay =
        document.getElementById("audio-duration");
    const status = document.getElementById("audio-player-status");

    if (!audio || !playButton || !progress) return;

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    function updateAudioProgress() {
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
            progress.value = "0";
            return;
        }

        progress.value = String(
            (audio.currentTime / audio.duration) * 100
        );

        if (currentTimeDisplay) {
            currentTimeDisplay.textContent =
                formatTime(audio.currentTime);
        }

        if (durationDisplay) {
            durationDisplay.textContent =
                formatTime(audio.duration);
        }
    }

    playButton.addEventListener("click", async () => {
        if (audio.paused) {
            try {
                await audio.play();
                playButton.textContent = "PAUSE TRACK";

                if (status) {
                    status.textContent = "PLAYING AUDIO...";
                }
            } catch (error) {
                if (status) {
                    status.textContent =
                        "Unable to play audio. Check the audio file path.";
                }
            }
        } else {
            audio.pause();
            playButton.textContent = "PLAY TRACK";

            if (status) {
                status.textContent = "AUDIO PAUSED.";
            }
        }
    });

    audio.addEventListener("timeupdate", updateAudioProgress);
    audio.addEventListener("loadedmetadata", updateAudioProgress);

    audio.addEventListener("ended", () => {
        playButton.textContent = "PLAY TRACK";

        if (status) {
            status.textContent = "TRACK COMPLETE.";
        }

        progress.value = "0";
    });

    progress.addEventListener("input", () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime =
                (Number(progress.value) / 100) * audio.duration;
        }
    });

    updateAudioProgress();
}

document.addEventListener("click", (event) => {
    const answerButton = event.target.closest(
        "[data-maturity-answer]"
    );

    if (answerButton) {
        handleMaturityAnswer(
            answerButton.dataset.maturityAnswer
        );
        return;
    }

    const objective = event.target.closest(".objective-item");

    if (objective) {
        const index = Number(objective.dataset.objective);

        if (Number.isInteger(index)) {
            openObjective(index);
        }
        return;
    }

    if (event.target.closest("#final-celebration-button")) {
        showFinalCelebration();
    }
});

/* ================================================
   PROJECT LELO | INITIALIZATION SEQUENCE
   ================================================ */

function initializeProject() {
    const initializationForm =
        document.getElementById("initialization-form");

    const terminalOutput =
        document.getElementById("terminal-output");

    const subjectNameInput =
        document.getElementById("subject-name");

    const subjectAgeInput =
        document.getElementById("subject-age");

    const initializeButton =
        initializationForm?.querySelector(
            'button[type="submit"]'
        );

    if (!initializationForm || !terminalOutput) {
        console.warn(
            "Initialization form or terminal output was not found."
        );
        return;
    }

    // Keep the mission button hidden until initialization succeeds.
    if (startButton) {
        startButton.hidden = true;
        startButton.disabled = true;
    }

    initializationForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (initializeButton) {
            initializeButton.disabled = true;
        }

        terminalOutput.replaceChildren();

        const enteredName =
            subjectNameInputSafe(subjectNameInput?.value || "");

        const enteredAge = Number(subjectAgeInput?.value);

        if (
            !enteredName ||
            !Number.isInteger(enteredAge) ||
            enteredAge < 1 ||
            enteredAge > 120
        ) {
            const errorLine = document.createElement("p");
            errorLine.textContent =
                "> ERROR: Enter a valid name and age.";
            errorLine.className = "code-error";
            terminalOutput.appendChild(errorLine);

            if (initializeButton) {
                initializeButton.disabled = false;
            }
            return;
        }

        // Save the values globally for every mission.
        subjectName = enteredName;
        subjectAge = enteredAge;
        projectVersion = (enteredAge / 10).toFixed(1);

        const bootMessages = [
            "> Initializing PROJECT LELO...",
            "> Loading Python environment...",
            "> Loading R analysis modules...",
            "> Establishing subject profile...",
            `> Subject identified: ${subjectName}`,
            `> Chronological age: ${subjectAge}`,
            `> Project version: ${projectVersion}`,
            "> Preparing data pipeline...",
            "> All systems ready."
        ];

        for (const message of bootMessages) {
            const line = document.createElement("p");
            line.textContent = message;
            terminalOutput.appendChild(line);
        }

        if (startButton) {
            startButton.disabled = false;
            startButton.hidden = false;
        }

        if (systemStatus) {
            systemStatus.textContent = "INITIALIZATION COMPLETE";
        }

        if (initializeButton) {
            initializeButton.disabled = false;
        }
    });
}


// ================================================
// STARTUP
// ================================================

document.addEventListener("DOMContentLoaded", () => {
    initializeProject();
    updateSystemStatus("AWAITING INITIALIZATION");
});

<form id="initialization-form">
    <label for="subject-name">Subject name</label>
    <input
        id="subject-name"
        name="subject-name"
        type="text"
        placeholder="Enter subject name"
        required
    >

    <label for="subject-age">Chronological age</label>
    <input
        id="subject-age"
        name="subject-age"
        type="number"
        min="1"
        max="120"
        placeholder="Enter age"
        required
    >

    <button type="submit">
        INITIALIZE PROJECT
    </button>
</form>

<div id="terminal-output" aria-live="polite"></div>

<button id="start-mission" type="button" hidden disabled>
    START MISSION
</button>
