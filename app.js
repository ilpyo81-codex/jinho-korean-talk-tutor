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
      createDesc: "Tutor Hana talks with JINHO like a chat room.",
      theme: "Game skin",
      create: "Create tutor",
      start: "Start chat",
      continue: "Continue",
      autoOn: "Auto voice: ON",
      autoOff: "Auto voice: OFF",
      listenTutor: "Listen tutor",
      listenKorean: "Listen Korean",
      micReply: "🎙 Reply by voice",
      record: "Record voice",
      stop: "Stop",
      next: "Next chat",
      finish: "Finish lesson",
      sayIntro: "In this situation, say this in Korean:",
      listenFirst: "Listen first, then reply with the mic!",
      listening: "Listening to JINHO...",
      blocked: "Automatic voice reply is not available in this browser. You can still listen and record voice.",
      micBlocked: "Microphone recording is blocked. Use HTTPS GitHub Pages and allow microphone access.",
      recording: "Recording... Tap Stop when JINHO finishes.",
      recorded: "Recorded. Play it back below.",
      score: "Score",
      recognized: "JINHO said",
      perfect: "Boom! Perfect Korean!",
      good: "Nice! That works!",
      retry: "Almost! Power up and say it again!",
      successNext: "Great reply! Let’s go to the next game moment.",
      allDone: "All chat lessons complete!",
      allDoneMsg: "Great job, JINHO!",
      reset: "Reset progress",
      review: "Review",
      noWeak: "No weak expressions yet.",
      profile: "Learning report",
      completed: "Completed",
      mastered: "Mastered",
      weak: "Weak",
      accuracy: "Accuracy",
      voicePage: "Voice practice",
      voicePageMsg: "Use Tutor for the conversation. This page is only for recording and playback."
    },
    ko: {
      switch: "English",
      streak: "연속",
      subtitle: "JINHO를 위한 대화형 한국어 튜터",
      nav: ["홈", "튜터", "복습", "음성", "프로필"],
      createTitle: "JINHO의 대화형 튜터 만들기",
      createDesc: "Tutor Hana가 채팅방처럼 JINHO와 대화해요.",
      theme: "게임 스킨",
      create: "튜터 생성",
      start: "대화 시작",
      continue: "계속하기",
      autoOn: "자동 음성: 켜짐",
      autoOff: "자동 음성: 꺼짐",
      listenTutor: "튜터 듣기",
      listenKorean: "한국어 듣기",
      micReply: "🎙 음성으로 답장",
      record: "음성 녹음",
      stop: "정지",
      next: "다음 대화",
      finish: "수업 완료",
      sayIntro: "이 상황에서는 한국어로 이렇게 말해요:",
      listenFirst: "먼저 듣고, 마이크로 답장해요!",
      listening: "JINHO의 답장을 듣고 있어요...",
      blocked: "이 브라우저에서는 자동 음성 답장을 사용할 수 없습니다. 듣기와 녹음은 계속 사용할 수 있어요.",
      micBlocked: "마이크 녹음이 막혔습니다. GitHub Pages HTTPS 주소에서 마이크를 허용해 주세요.",
      recording: "녹음 중... JINHO가 말한 뒤 정지를 누르세요.",
      recorded: "녹음 완료. 아래에서 다시 들어보세요.",
      score: "점수",
      recognized: "JINHO가 말한 내용",
      perfect: "완벽해요! 한국어 미션 성공!",
      good: "좋아요! 잘 말했어요!",
      retry: "거의 됐어요! 파워업하고 다시 말해봐요!",
      successNext: "좋은 답장이에요! 다음 게임 상황으로 가요.",
      allDone: "모든 대화 수업 완료!",
      allDoneMsg: "잘했어요, JINHO!",
      reset: "진도 초기화",
      review: "복습",
      noWeak: "아직 약한 표현이 없어요.",
      profile: "학습 리포트",
      completed: "완료",
      mastered: "익힌 표현",
      weak: "약점",
      accuracy: "정답률",
      voicePage: "음성 연습",
      voicePageMsg: "대화 수업은 튜터 탭에서 진행해요. 이 화면은 녹음과 재생용입니다."
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
    messages: [],
    score: null,
    recognized: "",
    voiceBlocked: false,
    feedback: "",
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
        resetConversation();
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
        <p class="muted">${state.lang === "en" ? "Tutor Hana will talk with you in a chat room." : "Tutor Hana가 채팅방에서 JINHO와 대화할 거예요."}</p>
        <button id="startBtn">${T("start")}</button>
      </section>
      <section class="card">
        <h2>${theme.icon} ${theme[state.lang]}</h2>
        <p class="muted">${currentLesson().title[state.lang]}</p>
        <button class="secondary" id="autoVoiceBtn">${state.autoVoice ? T("autoOn") : T("autoOff")}</button>
      </section>
    `;

    document.getElementById("startBtn").addEventListener("click", () => goTab("chat"));
    document.getElementById("autoVoiceBtn").addEventListener("click", toggleAutoVoice);
  }

  function ensureStepMessages() {
    if (state.messages.length) return;
    const step = currentStep();
    const theme = themes[state.theme];

    state.messages.push({
      who: "tutor",
      avatar: "🧑🏻‍🎤",
      text: `${theme.icon} ${step.tutor[state.lang]}`
    });

    state.messages.push({
      who: "tutor",
      avatar: "🧑🏻‍🎤",
      text: step.explain[state.lang]
    });

    state.messages.push({
      who: "tutor",
      avatar: "🧑🏻‍🎤",
      html: `${T("sayIntro")}<span class="korean-line">${step.expression}</span><span class="roman-line">${step.roman}</span><div class="chat-hint">${T("listenFirst")}</div>`,
      text: `${T("sayIntro")} ${step.expression}. ${T("listenFirst")}`
    });
  }

  function renderChat() {
    if (state.progress.completed.length >= lessons.length) return renderAllDone();

    ensureStepMessages();

    const lesson = currentLesson();
    const step = currentStep();
    const messageHtmls = state.messages.map((msg) => messageHtml(msg)).join("");

    screenEl.innerHTML = `
      <section class="card chat-room-card page-flip">
        <div class="muted">${lesson.title[state.lang]} · ${state.stepIndex + 1} / ${currentSteps().length}</div>
        <h2>🎮 Tutor Hana Chat</h2>

        <div class="chat-stage">
          <div class="chat-window">
            ${messageHtmls}
          </div>

          ${state.score !== null ? chatScoreHtml() : ""}
          ${state.voiceBlocked ? `<div class="notice"><b>${T("blocked")}</b></div>` : ""}
          <div class="feedback">${state.feedback}</div>

          <div class="chat-actions">
            <button id="listenTutorBtn">${T("listenTutor")}</button>
            <button class="secondary" id="listenKoreanBtn">${T("listenKorean")}</button>
            <button class="secondary" id="autoVoiceBtn">${state.autoVoice ? T("autoOn") : T("autoOff")}</button>
          </div>

          <button class="chat-mic-button" id="micReplyBtn">${T("micReply")}</button>

          <div class="chat-actions">
            <button class="warning" id="nextBtn">${isLastStep() ? T("finish") : T("next")}</button>
          </div>
        </div>
      </section>
    `;

    document.getElementById("listenTutorBtn").addEventListener("click", speakCurrentTutor);
    document.getElementById("listenKoreanBtn").addEventListener("click", () => speakKorean(step.expression));
    document.getElementById("autoVoiceBtn").addEventListener("click", toggleAutoVoice);
    document.getElementById("micReplyBtn").addEventListener("click", startVoiceReply);
    document.getElementById("nextBtn").addEventListener("click", nextChat);

    if (state.autoVoice && state.messages.length === 3 && !state.score && !state.feedback) {
      setTimeout(speakCurrentTutorThenKorean, 350);
    }
  }

  function messageHtml(msg) {
    const body = msg.html || escapeHtml(msg.text);
    return `
      <div class="message ${msg.who}">
        <div class="avatar">${msg.avatar}</div>
        <div class="bubble">${body}</div>
      </div>
    `;
  }

  function chatScoreHtml() {
    const score = state.score || 0;
    return `
      <div class="chat-score">
        ${T("score")}: <b>${score}</b><br>
        ${T("recognized")}: <b>${escapeHtml(state.recognized || "-")}</b>
      </div>
    `;
  }

  function speakCurrentTutor() {
    const step = currentStep();
    const text = `${step.tutor[state.lang]} ${step.explain[state.lang]} ${T("sayIntro")} ${step.expression}`;
    speakText(text, state.lang === "ko" ? "ko-KR" : "en-US", 1.02);
  }

  function speakCurrentTutorThenKorean() {
    const step = currentStep();
    const text = `${step.tutor[state.lang]} ${step.explain[state.lang]} ${T("sayIntro")}`;
    speakText(text, state.lang === "ko" ? "ko-KR" : "en-US", 1.02, () => {
      setTimeout(() => speakKorean(step.expression), 350);
    });
  }

  function speakKorean(text) {
    speakText(text, "ko-KR", 0.82);
  }

  function speakText(text, lang, rate, onEnd) {
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate || 0.95;
      utterance.pitch = lang === "ko-KR" ? 1.08 : 1.22;

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
      // Browser may block TTS until first user action.
    }
  }

  function startVoiceReply() {
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
    render();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      applyReply(spoken);
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

  function normalize(text) {
    return String(text || "").trim().replace(/[.?!]/g, "").replace(/\s+/g, " ");
  }

  function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
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

  function applyReply(spoken) {
    const step = currentStep();
    const target = step.expression;
    const score = similarityScore(spoken, target);

    state.recognized = spoken || "-";
    state.score = score;
    state.progress.attempts += 1;

    state.messages.push({
      who: "jinho",
      avatar: "👦",
      text: spoken || "-"
    });

    if (score >= 75) {
      state.progress.correct += 1;
      addMastered(target);
      const reply = `${score >= 90 ? T("perfect") : T("good")} ${step.reaction[state.lang]} ${T("successNext")}`;
      state.messages.push({ who: "tutor", avatar: "🧑🏻‍🎤", text: reply });
      state.feedback = `<span class="good">${score >= 90 ? T("perfect") : T("good")}</span>`;
      save();
      render();
      speakText(reply, state.lang === "ko" ? "ko-KR" : "en-US", 1.03);
      setTimeout(nextChat, 3000);
      return;
    }

    addWeak(target);
    const retry = `${T("retry")} ${T("sayIntro")} ${target}`;
    state.messages.push({
      who: "tutor",
      avatar: "🧑🏻‍🎤",
      html: `${T("retry")}<span class="korean-line">${target}</span><span class="roman-line">${step.roman}</span>`,
      text: retry
    });
    state.feedback = `<span class="bad">${T("retry")}</span>`;
    save();
    render();
    speakText(retry, state.lang === "ko" ? "ko-KR" : "en-US", 1.03, () => {
      setTimeout(() => speakKorean(target), 350);
    });
  }

  function nextChat() {
    state.feedback = "";
    state.score = null;
    state.recognized = "";
    state.voiceBlocked = false;
    state.messages = [];

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
          <div class="expression">${escapeHtml(text)}</div>
          <button data-review-index="${index}">${T("listenKorean")}</button>
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

  function toggleAutoVoice() {
    state.autoVoice = !state.autoVoice;
    save();
    render();
  }

  function resetProgress() {
    state.progress = { completed: [], mastered: [], weak: [], streak: 1, correct: 0, attempts: 0 };
    state.lessonIndex = 0;
    state.stepIndex = 0;
    state.messages = [];
    state.feedback = "";
    state.score = null;
    state.recognized = "";
    state.voiceBlocked = false;
    save();
    render();
  }

  function resetConversation() {
    state.lessonIndex = 0;
    state.stepIndex = 0;
    state.messages = [];
    state.feedback = "";
    state.score = null;
    state.recognized = "";
    state.voiceBlocked = false;
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
    state.messages = [];
    save();
    render();
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => goTab(button.dataset.tab));
  });

  render();
})();
