(function () {
  "use strict";

  const DATA = window.TALK_TUTOR_DATA;
  const themes = DATA.themes;
  const lessons = DATA.lessons;

  const screenEl = document.getElementById("screen");
  const skinStrip = document.getElementById("skinStrip");
  const streakEl = document.getElementById("streakDays");
  const streakLabel = document.getElementById("streakLabel");
  const langBtn = document.getElementById("langBtn");
  const subtitleText = document.getElementById("subtitleText");

  const ui = {
    en: {
      switch: "한국어",
      streak: "streak",
      subtitle: "Conversation Korean tutor for JINHO",
      nav: ["Home", "Tutor", "Review", "Voice", "Profile"],
      createTitle: "Create JINHO’s Talk Tutor",
      createDesc: "Tutor Hana explains a game situation, teaches Korean, and JINHO follows.",
      theme: "Game skin",
      create: "Create tutor",
      start: "Start chat lesson",
      continue: "Continue chat",
      listenTutor: "Listen tutor",
      listenExpression: "Listen Korean",
      autoRead: "Auto voice",
      autoOn: "Auto voice: ON",
      autoOff: "Auto voice: OFF",
      scoreVoice: "🎯 Score my voice",
      record: "Record voice",
      stop: "Stop",
      next: "Next chat",
      micPrompt: "Tap the mic and say it!",
      listening: "Listening to JINHO...",
      streamerTag: "🎮 Streamer Tutor Mode",
      retryCoach: "Nice try! Power up and say it again!",
      successCoach: "Boom! Great Korean! Next mission!",
      finish: "Finish lesson",
      sayThis: "Say this in Korean",
      meaning: "Meaning",
      roman: "Sound",
      score: "Score",
      target: "Target",
      recognized: "Recognized",
      perfect: "Excellent!",
      good: "Good job!",
      retry: "Try one more time!",
      blocked: "Automatic voice score is not available in this browser. Use Record voice to record and play back JINHO’s voice.",
      micBlocked: "Microphone recording is blocked. Use HTTPS GitHub Pages and allow microphone access.",
      recording: "Recording... Tap Stop when JINHO finishes.",
      recorded: "Recorded. Play it back below.",
      completed: "Completed",
      allDone: "All chat lessons complete!",
      allDoneMsg: "Great job, JINHO!",
      reset: "Reset progress",
      review: "Review",
      profile: "Learning report",
      mastered: "Mastered",
      weak: "Weak",
      accuracy: "Accuracy",
      noWeak: "No weak expressions yet.",
      voicePage: "Voice practice",
      voicePageMsg: "Use the Tutor tab for full conversation lessons. This page is for recording and playback."
    },
    ko: {
      switch: "English",
      streak: "연속",
      subtitle: "JINHO를 위한 대화형 한국어 튜터",
      nav: ["홈", "튜터", "복습", "음성", "프로필"],
      createTitle: "JINHO의 대화형 튜터 만들기",
      createDesc: "Tutor Hana가 게임 상황을 설명하고, 한국어 표현을 알려주면 JINHO가 따라 말해요.",
      theme: "게임 스킨",
      create: "튜터 생성",
      start: "대화 수업 시작",
      continue: "계속하기",
      listenTutor: "튜터 음성",
      listenExpression: "한국어 듣기",
      autoRead: "자동 음성",
      autoOn: "자동 음성: 켜짐",
      autoOff: "자동 음성: 꺼짐",
      scoreVoice: "🎯 말하기 점수",
      record: "음성 녹음",
      stop: "정지",
      next: "다음 대화",
      micPrompt: "마이크를 누르고 말해요!",
      listening: "JINHO의 말을 듣고 있어요...",
      streamerTag: "🎮 스트리머 튜터 모드",
      retryCoach: "오 거의 됐어요! 파워업하고 다시 말해봐요!",
      successCoach: "좋아요! 한국어 미션 성공! 다음으로 가요!",
      finish: "수업 완료",
      sayThis: "이 한국어를 말해요",
      meaning: "뜻",
      roman: "소리",
      score: "점수",
      target: "목표",
      recognized: "인식",
      perfect: "아주 잘했어요!",
      good: "잘했어요!",
      retry: "한 번 더 해봐요!",
      blocked: "이 브라우저에서는 자동 말하기 점수를 사용할 수 없습니다. 음성 녹음으로 JINHO의 목소리를 녹음하고 다시 들어보세요.",
      micBlocked: "마이크 녹음이 막혔습니다. GitHub Pages HTTPS 주소에서 마이크를 허용해 주세요.",
      recording: "녹음 중... JINHO가 말한 뒤 정지를 누르세요.",
      recorded: "녹음 완료. 아래에서 다시 들어보세요.",
      completed: "완료",
      allDone: "모든 대화 수업 완료!",
      allDoneMsg: "잘했어요, JINHO!",
      reset: "진도 초기화",
      review: "복습",
      profile: "학습 리포트",
      mastered: "익힌 표현",
      weak: "약점",
      accuracy: "정답률",
      noWeak: "아직 약한 표현이 없어요.",
      voicePage: "음성 연습",
      voicePageMsg: "전체 대화 수업은 튜터 탭에서 진행해요. 이 화면은 녹음과 재생용입니다."
    }
  };

  function defaultProgress() {
    return { completed: [], mastered: [], weak: [], streak: 0, correct: 0, attempts: 0 };
  }

  function safeGet(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  const state = {
    lang: safeGet("talkTutor_lang", "en"),
    theme: safeGet("talkTutor_theme", "minecraft"),
    tab: "home",
    lessonIndex: 0,
    stepIndex: 0,
    autoVoice: safeGet("talkTutor_autoVoice", true),
    settings: safeGet("talkTutor_settings", null),
    progress: safeGet("talkTutor_progress", defaultProgress()),
    feedback: "",
    score: null,
    recognized: "",
    jinhoBubble: "",
    tutorReply: "",
    voiceBlocked: false,
    audioUrl: "",
    recorder: null,
    chunks: [],
    stream: null
  };

  if (!themes[state.theme]) state.theme = "minecraft";

  function T(key) {
    return ui[state.lang][key];
  }

  function save() {
    localStorage.setItem("talkTutor_lang", JSON.stringify(state.lang));
    localStorage.setItem("talkTutor_theme", JSON.stringify(state.theme));
    localStorage.setItem("talkTutor_autoVoice", JSON.stringify(state.autoVoice));
    localStorage.setItem("talkTutor_settings", JSON.stringify(state.settings));
    localStorage.setItem("talkTutor_progress", JSON.stringify(state.progress));
    updateTop();
  }

  function currentLesson() {
    return lessons[state.lessonIndex];
  }

  function currentSteps() {
    const lesson = currentLesson();
    return lesson.steps[state.theme] || lesson.steps.minecraft;
  }

  function currentStep() {
    return currentSteps()[state.stepIndex];
  }

  function isLastStep() {
    return state.stepIndex >= currentSteps().length - 1;
  }

  function isLastLesson() {
    return state.lessonIndex >= lessons.length - 1;
  }

  function updateTop() {
    document.body.className = "skin-" + state.theme;
    streakEl.textContent = state.progress.streak || 0;
    streakLabel.textContent = T("streak");
    langBtn.textContent = T("switch");
    subtitleText.textContent = T("subtitle");

    const ids = ["home", "chat", "review", "record", "profile"];
    const nav = T("nav");
    ids.forEach((id, index) => {
      const button = document.getElementById("tab-" + id);
      if (button) {
        button.textContent = nav[index];
        button.className = state.tab === id ? "active" : "";
      }
    });

    renderSkinStrip();
  }

  function renderSkinStrip() {
    if (!state.settings) {
      skinStrip.innerHTML = "";
      return;
    }

    skinStrip.innerHTML = Object.keys(themes).map((key) => {
      const theme = themes[key];
      const active = key === state.theme ? " active" : "";
      return `<button class="skin-chip${active}" data-skin="${key}">${theme.icon} ${theme[state.lang]}</button>`;
    }).join("");

    skinStrip.querySelectorAll("[data-skin]").forEach((button) => {
      button.addEventListener("click", () => {
        state.theme = button.dataset.skin;
        resetChatPosition();
        save();
        render();
      });
    });
  }

  function render() {
    try {
      updateTop();
      if (!state.settings) return renderOnboarding();
      if (state.tab === "home") return renderHome();
      if (state.tab === "chat") return renderChat();
      if (state.tab === "review") return renderReview();
      if (state.tab === "record") return renderRecordPage();
      if (state.tab === "profile") return renderProfile();
    } catch (error) {
      screenEl.innerHTML = `<div class="error"><b>Error</b><br>${escapeHtml(error.message)}</div>`;
    }
  }

  function renderOnboarding() {
    screenEl.innerHTML = `
      <section class="card hero">
        <h1>${T("createTitle")}</h1>
        <p class="muted">${T("createDesc")}</p>
      </section>

      <section class="card">
        <h2>JINHO · Age 5</h2>
        <label class="muted">${T("theme")}</label>
        <select id="themeSelect">
          <option value="minecraft">⛏️ Minecraft</option>
          <option value="roblox">🕹️ Roblox</option>
          <option value="pokemon">⚡ Pokémon</option>
          <option value="mario">🍄 Super Mario</option>
        </select>
        <button class="full" id="createBtn">${T("create")}</button>
      </section>
    `;

    document.getElementById("createBtn").addEventListener("click", () => {
      state.settings = { name: "JINHO", age: 5 };
      state.theme = document.getElementById("themeSelect").value;
      state.progress.streak = 1;
      state.tab = "home";
      save();
      render();
    });
  }

  function renderHome() {
    const theme = themes[state.theme];
    screenEl.innerHTML = `
      <section class="card hero">
        <h1>Hi JINHO!</h1>
        <p class="muted">${state.lang === "en" ? "Tutor Hana will talk with you and teach Korean." : "Tutor Hana가 JINHO와 대화하면서 한국어를 알려줄 거예요."}</p>
        <button id="startBtn">${T("start")}</button>
      </section>
      ${sceneHtml()}
      <section class="card">
        <h2>${theme.icon} ${theme[state.lang]} Tutor Chat</h2>
        <p class="muted">${currentLesson().title[state.lang]}</p>
        <div class="actions">
          <button class="secondary" id="autoVoiceBtn">${state.autoVoice ? T("autoOn") : T("autoOff")}</button>
        </div>
      </section>
    `;

    document.getElementById("startBtn").addEventListener("click", () => goTab("chat"));
    document.getElementById("autoVoiceBtn").addEventListener("click", toggleAutoVoice);
  }

  function renderChat() {
    if (state.progress.completed.length >= lessons.length) return renderAllDone();

    const lesson = currentLesson();
    const step = currentStep();
    const theme = themes[state.theme];

    screenEl.innerHTML = `
      <section class="card page-flip">
        <div class="muted">${lesson.title[state.lang]} · ${state.stepIndex + 1} / ${currentSteps().length}</div>
        <h2>${theme.icon} Tutor Hana</h2>
        <span class="tutor-energy">${T("streamerTag")}</span>
        <div class="chat-window">
          ${messageHtml("tutor", "🧑🏻‍🎤", step.tutor[state.lang])}
          ${messageHtml("tutor", "🧑🏻‍🎤", step.explain[state.lang])}
          ${messageHtml("tutor", "🧑🏻‍🎤", `${T("sayThis")}: ${step.expression}`)}
          ${state.jinhoBubble ? messageHtml("jinho", "👦", state.jinhoBubble) : ""}
          ${state.tutorReply ? messageHtml("tutor", "🧑🏻‍🎤", state.tutorReply) : ""}
        </div>
        <div class="actions">
          <button id="listenTutorBtn">${T("listenTutor")}</button>
          <button class="secondary" id="autoVoiceBtn">${state.autoVoice ? T("autoOn") : T("autoOff")}</button>
        </div>
      </section>

      ${sceneHtml()}

      <section class="expression-card active page-flip">
        <h3>${T("sayThis")}</h3>
        <div class="expression">${step.expression}</div>
        <div class="roman">${T("roman")}: ${step.roman}</div>
        <div class="meaning">${T("meaning")}: ${step.meaning[state.lang]}</div>
        <div class="actions">
          <button id="listenExpressionBtn">${T("listenExpression")}</button>
        </div>
        <div class="mic-chat">
          <button class="mic-round" id="scoreVoiceBtn">🎙 ${T("micPrompt")}</button>
        </div>
      </section>

      <section class="card">
        ${scoreHtml()}
        ${voiceBlockedHtml()}
        ${recordBoxHtml()}
        <div class="feedback">${state.feedback}</div>
        <div class="actions">
          <button id="nextBtn">${isLastStep() ? T("finish") : T("next")}</button>
        </div>
      </section>
    `;

    document.getElementById("listenTutorBtn").addEventListener("click", speakTutor);
    document.getElementById("listenExpressionBtn").addEventListener("click", () => speakKorean(step.expression));
    document.getElementById("scoreVoiceBtn").addEventListener("click", startVoiceScore);
    document.getElementById("nextBtn").addEventListener("click", nextChat);
    document.getElementById("autoVoiceBtn").addEventListener("click", toggleAutoVoice);
    bindRecordButtons();

    if (state.autoVoice) {
      setTimeout(() => speakTutorThenExpression(), 350);
    }
  }

  function messageHtml(who, avatar, text) {
    return `
      <div class="message ${who}">
        <div class="avatar">${avatar}</div>
        <div class="bubble">${escapeHtml(text)}</div>
      </div>
    `;
  }

  function sceneHtml() {
    const theme = themes[state.theme];
    const chars = theme.chars.map((char, index) => `<div class="char ${index > 0 ? "small" : ""}">${char}</div>`).join("");
    const items = theme.items.map((item) => `<span class="item-badge">${item}</span>`).join("");

    return `
      <section class="card game-scene">
        <div class="scene-row">
          <div>
            <h2>${theme.icon} ${theme[state.lang]}</h2>
            <p class="muted">${state.lang === "en" ? "Game situation" : "게임 상황"}</p>
          </div>
          <div class="scene-chars">${chars}</div>
        </div>
        <div class="item-row">${items}</div>
      </section>
    `;
  }

  function scoreHtml() {
    if (state.score === null && !state.recognized) return "";
    const score = state.score || 0;
    return `
      <div class="score-card">
        <h3>🎯 ${T("score")}</h3>
        <div class="score-big">${score}</div>
        <div class="score-bar"><div class="score-fill" style="width:${score}%"></div></div>
        <div class="score-row">
          <div class="score-mini">${T("target")}<br>${currentStep().expression}</div>
          <div class="score-mini">${T("recognized")}<br>${state.recognized || "-"}</div>
        </div>
      </div>
    `;
  }

  function voiceBlockedHtml() {
    if (!state.voiceBlocked) return "";
    return `<div class="notice"><b>${T("blocked")}</b></div>`;
  }

  function recordBoxHtml() {
    const audio = state.audioUrl ? `<audio controls src="${state.audioUrl}"></audio>` : "";
    return `
      <div class="record-box">
        <h3>🎙 ${T("record")}</h3>
        <p class="muted">${state.lang === "en" ? "Record JINHO’s real voice and play it back." : "JINHO의 실제 목소리를 녹음하고 다시 들어볼 수 있어요."}</p>
        <div class="actions">
          <button id="recordBtn">${T("record")}</button>
          <button class="warning" id="stopBtn">${T("stop")}</button>
        </div>
        ${audio}
      </div>
    `;
  }

  function bindRecordButtons() {
    const recordBtn = document.getElementById("recordBtn");
    const stopBtn = document.getElementById("stopBtn");
    if (recordBtn) recordBtn.addEventListener("click", startRecording);
    if (stopBtn) stopBtn.addEventListener("click", stopRecording);
  }

  function speakTutor() {
    const step = currentStep();
    speakText(step.tutor[state.lang] + " " + step.explain[state.lang], state.lang === "ko" ? "ko-KR" : "en-US", 0.88);
  }

  function speakTutorThenExpression() {
    const step = currentStep();
    const text = step.tutor[state.lang] + " " + step.explain[state.lang];
    speakText(text, state.lang === "ko" ? "ko-KR" : "en-US", 0.88, () => {
      setTimeout(() => speakKorean(step.expression), 350);
    });
  }

  function speakKorean(text) {
    speakText(text, "ko-KR", 0.78);
  }

  function speakText(text, lang, rate, onEnd) {
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate || 0.95;
      utterance.pitch = lang === "ko-KR" ? 1.12 : 1.22;

      const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
      const preferred = voices.find((voice) =>
        voice.lang && voice.lang.toLowerCase().startsWith(lang.toLowerCase().slice(0, 2))
      );
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => {
        if (typeof onEnd === "function") onEnd();
      };
      speechSynthesis.speak(utterance);
    } catch {
      // Some browsers may block TTS until the first user action.
    }
  }

  function toggleAutoVoice() {
    state.autoVoice = !state.autoVoice;
    save();
    render();
  }

  function normalize(text) {
    return String(text || "").trim().replace(/[.?!]/g, "").replace(/\s+/g, " ");
  }

  function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function similarityScore(a, b) {
    a = normalize(a);
    b = normalize(b);
    if (!a || !b) return 0;
    if (a === b) return 100;
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    let score = Math.round((1 - levenshtein(longer, shorter) / Math.max(longer.length, 1)) * 100);
    if (a.includes(b) || b.includes(a)) score = Math.max(score, 78);
    return Math.max(0, Math.min(100, score));
  }

  function startVoiceScore() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      state.voiceBlocked = true;
      state.feedback = `<span class="bad">${T("blocked")}</span>`;
      render();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    state.voiceBlocked = false;
    state.feedback = T("listening");
    state.tutorReply = "";
    render();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      applyScore(spoken);
    };

    recognition.onerror = () => {
      state.voiceBlocked = true;
      state.feedback = `<span class="bad">${T("blocked")}</span>`;
      render();
    };

    try {
      recognition.start();
    } catch {
      state.voiceBlocked = true;
      state.feedback = `<span class="bad">${T("blocked")}</span>`;
      render();
    }
  }

  function applyScore(spoken) {
    const target = currentStep().expression;
    const score = similarityScore(spoken, target);

    state.recognized = spoken || "-";
    state.jinhoBubble = spoken || "-";
    state.score = score;
    state.progress.attempts += 1;

    if (score >= 75) {
      state.feedback = `<span class="good">${score >= 90 ? T("perfect") : T("good")}</span>`;
      state.progress.correct += 1;
      addMastered(target);
      state.tutorReply = currentStep().reaction[state.lang] + " " + T("successCoach");
      save();
      render();
      speakText(state.tutorReply, state.lang === "ko" ? "ko-KR" : "en-US", 1.02);
      setTimeout(() => nextChat(), 2600);
      return;
    }

    state.feedback = `<span class="bad">${T("retry")}</span>`;
    addWeak(target);
    state.tutorReply = T("retryCoach") + " " + (state.lang === "en" ? "Listen again: " : "다시 들어봐요: ") + target;
    save();
    render();
    speakText(state.tutorReply, state.lang === "ko" ? "ko-KR" : "en-US", 1.02, () => {
      setTimeout(() => speakKorean(target), 350);
    });
  }

  function speakReaction() {
    const reaction = currentStep().reaction[state.lang];
    setTimeout(() => speakText(reaction, state.lang === "ko" ? "ko-KR" : "en-US", 0.9), 300);
  }

  function addMastered(text) {
    if (!state.progress.mastered.includes(text)) state.progress.mastered.push(text);
    const index = state.progress.weak.indexOf(text);
    if (index >= 0) state.progress.weak.splice(index, 1);
  }

  function addWeak(text) {
    if (!state.progress.mastered.includes(text) && !state.progress.weak.includes(text)) {
      state.progress.weak.push(text);
    }
  }

  function nextChat() {
    state.feedback = "";
    state.score = null;
    state.recognized = "";
    state.jinhoBubble = "";
    state.tutorReply = "";
    state.voiceBlocked = false;
    state.audioUrl = "";

    if (!isLastStep()) {
      state.stepIndex += 1;
      save();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    completeLesson();
  }

  function completeLesson() {
    const lessonId = currentLesson().id;
    if (!state.progress.completed.includes(lessonId)) {
      state.progress.completed.push(lessonId);
    }

    if (!isLastLesson()) {
      state.lessonIndex += 1;
      state.stepIndex = 0;
      save();
      screenEl.innerHTML = `
        <section class="card hero page-flip">
          <h1>${T("completed")}</h1>
          <p class="muted">${currentLesson().title[state.lang]}</p>
          <button id="continueBtn">${T("continue")}</button>
        </section>
      `;
      document.getElementById("continueBtn").addEventListener("click", () => goTab("chat"));
    } else {
      save();
      renderAllDone();
    }
  }

  function renderAllDone() {
    screenEl.innerHTML = `
      <section class="card hero page-flip">
        <h1>${T("allDone")}</h1>
        <p class="muted">${T("allDoneMsg")}</p>
        <button id="resetBtn">${T("reset")}</button>
      </section>
    `;
    document.getElementById("resetBtn").addEventListener("click", resetProgress);
  }

  function renderReview() {
    const weak = state.progress.weak;
    let html = `<section class="card"><h1>${T("review")}</h1></section>`;
    if (!weak.length) {
      html += `<section class="card hero"><p class="muted">${T("noWeak")}</p></section>`;
    }

    weak.forEach((text, index) => {
      html += `
        <section class="card">
          <div class="expression">${text}</div>
          <button data-review-index="${index}">${T("listenExpression")}</button>
        </section>
      `;
    });

    screenEl.innerHTML = html;
    document.querySelectorAll("[data-review-index]").forEach((button) => {
      button.addEventListener("click", () => speakKorean(weak[Number(button.dataset.reviewIndex)]));
    });
  }

  function renderRecordPage() {
    screenEl.innerHTML = `
      <section class="card">
        <h1>${T("voicePage")}</h1>
        <p class="muted">${T("voicePageMsg")}</p>
      </section>
      <section class="card">
        ${recordBoxHtml()}
      </section>
    `;
    bindRecordButtons();
  }

  function renderProfile() {
    const accuracy = state.progress.attempts ? Math.round((state.progress.correct / state.progress.attempts) * 100) : 0;
    screenEl.innerHTML = `
      <section class="card">
        <h1>${T("profile")}</h1>
        <div class="stat-grid">
          <div class="stat"><b>${state.progress.completed.length}</b>${T("completed")}</div>
          <div class="stat"><b>${state.progress.mastered.length}</b>${T("mastered")}</div>
          <div class="stat"><b>${state.progress.weak.length}</b>${T("weak")}</div>
          <div class="stat"><b>${accuracy}%</b>${T("accuracy")}</div>
        </div>
        <div class="actions">
          <button class="warning" id="resetProgressBtn">${T("reset")}</button>
        </div>
      </section>
    `;
    document.getElementById("resetProgressBtn").addEventListener("click", resetProgress);
  }

  function getSupportedAudioMimeType() {
    if (typeof MediaRecorder === "undefined") return "";
    const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac", ""];
    for (const type of candidates) {
      try {
        if (!type || MediaRecorder.isTypeSupported(type)) return type;
      } catch {}
    }
    return "";
  }

  async function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === "undefined") {
      state.feedback = `<span class="bad">${T("micBlocked")}</span>`;
      render();
      return;
    }

    try {
      stopStream();
      state.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });

      state.chunks = [];
      const mimeType = getSupportedAudioMimeType();
      state.recorder = new MediaRecorder(state.stream, mimeType ? { mimeType } : undefined);

      state.recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) state.chunks.push(event.data);
      };

      state.recorder.onstop = () => {
        try {
          const type = state.chunks[0] && state.chunks[0].type ? state.chunks[0].type : "audio/webm";
          const blob = new Blob(state.chunks, { type });
          if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
          state.audioUrl = URL.createObjectURL(blob);
          state.feedback = `<span class="good">${T("recorded")}</span>`;
        } catch {
          state.feedback = `<span class="bad">${T("micBlocked")}</span>`;
        }
        stopStream();
        render();
      };

      state.recorder.start(250);
      state.feedback = `<span class="good">${T("recording")}</span>`;
      render();
    } catch (error) {
      stopStream();
      state.feedback = `<span class="bad">${T("micBlocked")} (${escapeHtml(error.name || error.message)})</span>`;
      render();
    }
  }

  function stopRecording() {
    try {
      if (state.recorder && state.recorder.state === "recording") {
        state.recorder.stop();
      } else {
        state.feedback = state.lang === "en" ? "No active recording." : "진행 중인 녹음이 없습니다.";
        stopStream();
        render();
      }
    } catch (error) {
      stopStream();
      state.feedback = `<span class="bad">${T("micBlocked")} (${escapeHtml(error.name || error.message)})</span>`;
      render();
    }
  }

  function stopStream() {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
      state.stream = null;
    }
  }

  function resetProgress() {
    state.progress = { completed: [], mastered: [], weak: [], streak: 1, correct: 0, attempts: 0 };
    resetChatPosition();
    state.feedback = "";
    state.score = null;
    state.recognized = "";
    state.jinhoBubble = "";
    state.tutorReply = "";
    state.voiceBlocked = false;
    save();
    render();
  }

  function resetChatPosition() {
    state.lessonIndex = 0;
    state.stepIndex = 0;
  }

  function goTab(tab) {
    state.tab = tab;
    render();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  langBtn.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "ko" : "en";
    save();
    render();
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => goTab(button.dataset.tab));
  });

  render();
})();
