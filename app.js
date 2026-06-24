(function () {
  "use strict";

  const DATA = window.KTUTOR_DATA;
  const themes = DATA.themes;
  const curriculum = DATA.curriculum;
  const stories = DATA.stories;

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
      nav: ["Home", "Lesson", "Review", "Speak", "Profile"],
      subtitle: "Korean speaking missions for kids",
      createTitle: "Create JINHO’s tutor",
      createDesc: "Choose a game skin and practice short Korean missions.",
      studentInfo: "Student info",
      theme: "Game skin",
      create: "Create tutor",
      start: "Start mission",
      status: "Learning status",
      completed: "Completed lessons",
      mission: "Story mission",
      listen: "Listen",
      slow: "Slow listen",
      repeat: "Repeat",
      scoreVoice: "🎯 Score my voice",
      speak: "🎙 Speak now",
      record: "Record voice",
      stop: "Stop",
      next: "Next page",
      finish: "Finish mission",
      skip: "He knows this. Skip",
      write: "Writing option",
      showWrite: "Show writing",
      checkWrite: "Check writing",
      typeHere: "Type Korean here",
      condition: "Condition to move on",
      row: "correct in a row",
      target: "Target",
      recognized: "Recognized",
      score: "Score",
      perfect: "Excellent!",
      good: "Good job!",
      retry: "Try one more time!",
      blocked: "Automatic voice score is not available in this browser. Please use Record voice to record and play back JINHO’s voice.",
      micBlocked: "Microphone recording is blocked. Use HTTPS GitHub Pages and allow microphone access.",
      recording: "Recording... Tap Stop when JINHO finishes.",
      recorded: "Recorded. Play it back below.",
      parent: "Automatic score unavailable",
      pPerfect: "Perfect",
      pGood: "Good",
      pRetry: "Retry",
      done: "Mission complete!",
      allDone: "All missions complete!",
      allDoneMsg: "Great job, JINHO! You finished all missions.",
      review: "Review",
      continue: "Continue",
      reset: "Reset progress",
      profile: "Learning report",
      mastered: "Mastered",
      weak: "Weak",
      accuracy: "Accuracy",
      roleplay: "Game story practice",
      roleplayMsg: "Use Lesson for voice scoring. More roleplays can be added here."
    },
    ko: {
      switch: "English",
      streak: "연속",
      nav: ["홈", "수업", "복습", "말하기", "프로필"],
      subtitle: "5살 아이용 한국어 말하기 미션",
      createTitle: "JINHO의 튜터 만들기",
      createDesc: "게임 스킨을 고르고 짧은 한국어 미션을 연습해요.",
      studentInfo: "학생 정보",
      theme: "게임 스킨",
      create: "튜터 생성",
      start: "미션 시작",
      status: "학습 상태",
      completed: "완료한 수업",
      mission: "스토리 미션",
      listen: "듣기",
      slow: "천천히 듣기",
      repeat: "반복",
      scoreVoice: "🎯 말하기 점수",
      speak: "🎙 지금 말하기",
      record: "음성 녹음",
      stop: "정지",
      next: "다음 페이지",
      finish: "미션 완료",
      skip: "이미 알아요. 넘어가기",
      write: "쓰기 옵션",
      showWrite: "쓰기 열기",
      checkWrite: "쓰기 확인",
      typeHere: "한국어 입력",
      condition: "다음 조건",
      row: "연속 정답",
      target: "목표",
      recognized: "인식",
      score: "점수",
      perfect: "아주 잘했어요!",
      good: "잘했어요!",
      retry: "한 번 더 해봐요!",
      blocked: "이 브라우저에서는 자동 말하기 점수를 사용할 수 없습니다. Record voice로 JINHO의 목소리를 녹음하고 다시 들어보세요.",
      micBlocked: "마이크 녹음이 막혔습니다. GitHub Pages HTTPS 주소에서 마이크를 허용해 주세요.",
      recording: "녹음 중... JINHO가 말한 뒤 정지를 누르세요.",
      recorded: "녹음 완료. 아래에서 다시 들어보세요.",
      parent: "자동 점수 사용 불가",
      pPerfect: "완벽해요",
      pGood: "잘했어요",
      pRetry: "다시",
      done: "미션 완료!",
      allDone: "모든 미션 완료!",
      allDoneMsg: "잘했어요, JINHO! 모든 미션을 끝냈습니다.",
      review: "복습",
      continue: "계속",
      reset: "진도 초기화",
      profile: "학습 리포트",
      mastered: "익힌 표현",
      weak: "약점",
      accuracy: "정답률",
      roleplay: "게임 스토리 말하기",
      roleplayMsg: "수업 화면에서 말하기 점수를 사용할 수 있어요. 역할극은 나중에 더 추가할 수 있습니다."
    }
  };

  function defaultProgress() {
    return {
      completed: [],
      mastered: [],
      weak: [],
      streak: 0,
      correct: 0,
      attempts: 0
    };
  }

  function safeGet(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  const state = {
    lang: safeGet("jinhoTutor_lang", "en"),
    theme: safeGet("jinhoTutor_theme", "minecraft"),
    tab: "home",
    lesson: 0,
    item: 0,
    correctRow: 0,
    feedback: "",
    score: null,
    recognized: "",
    fallback: false,
    write: false,
    audioUrl: "",
    recorder: null,
    chunks: [],
    stream: null,
    settings: safeGet("jinhoTutor_settings", null),
    progress: safeGet("jinhoTutor_progress", defaultProgress())
  };

  if (!themes[state.theme]) {
    state.theme = "minecraft";
  }

  function T(key) {
    return ui[state.lang][key];
  }

  function save() {
    localStorage.setItem("jinhoTutor_lang", JSON.stringify(state.lang));
    localStorage.setItem("jinhoTutor_theme", JSON.stringify(state.theme));
    localStorage.setItem("jinhoTutor_settings", JSON.stringify(state.settings));
    localStorage.setItem("jinhoTutor_progress", JSON.stringify(state.progress));
    updateTop();
  }

  function currentLesson() {
    return curriculum[state.lesson];
  }

  function currentItem() {
    return currentLesson().items[state.item];
  }

  function isLastItem() {
    return state.item >= currentLesson().items.length - 1;
  }

  function isLastLesson() {
    return state.lesson >= curriculum.length - 1;
  }

  function requiredCorrect() {
    return 2;
  }

  function updateTop() {
    document.body.className = "skin-" + state.theme;
    streakEl.textContent = state.progress.streak || 0;
    streakLabel.textContent = T("streak");
    langBtn.textContent = T("switch");
    subtitleText.textContent = T("subtitle");

    const ids = ["home", "lesson", "review", "speak", "profile"];
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

    const order = ["minecraft", "roblox", "pokemon", "mario"];
    skinStrip.innerHTML = order
      .map((themeKey) => {
        const theme = themes[themeKey];
        const active = themeKey === state.theme ? " active" : "";
        return `<button class="skin-chip${active}" data-skin="${themeKey}">${theme.icon} ${theme[state.lang]}</button>`;
      })
      .join("");

    skinStrip.querySelectorAll("[data-skin]").forEach((button) => {
      button.addEventListener("click", () => {
        state.theme = button.dataset.skin;
        save();
        render();
      });
    });
  }

  function storyText() {
    const themeStories = stories[state.theme] || stories.minecraft;
    const lessonStories = themeStories[currentLesson().id] || themeStories.greet;
    const story = lessonStories[state.item] || lessonStories[0];
    return story[state.lang] || story.en;
  }

  function sceneHtml() {
    const theme = themes[state.theme];
    const chars = theme.chars
      .map((char, index) => `<div class="char ${index > 0 ? "small" : ""}">${char}</div>`)
      .join("");

    const items = theme.items.map((item) => `<span class="item-badge">${item}</span>`).join("");

    return `
      <section class="card game-scene page-flip">
        <div class="scene-row">
          <div>
            <h2>${theme.icon} ${theme[state.lang]}</h2>
            <p class="muted">${state.lang === "en" ? "Game skin" : "게임 스킨"}</p>
          </div>
          <div class="scene-chars">${chars}</div>
        </div>
        <div class="item-row">${items}</div>
      </section>
    `;
  }

  function render() {
    try {
      updateTop();

      if (!state.settings) {
        renderOnboarding();
        return;
      }

      if (state.tab === "home") renderHome();
      else if (state.tab === "lesson") renderLesson();
      else if (state.tab === "review") renderReview();
      else if (state.tab === "speak") renderSpeak();
      else if (state.tab === "profile") renderProfile();
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
        <h2>${T("studentInfo")}</h2>
        <input class="input" value="JINHO" readonly />
        <label class="muted">${T("theme")}</label>
        <select id="themeSelect">
          <option value="minecraft">⛏️ Minecraft</option>
          <option value="roblox">🕹️ Roblox</option>
          <option value="pokemon">⚡ Pokémon</option>
          <option value="mario">🍄 Super Mario</option>
        </select>
        <button class="full" id="createTutorBtn">${T("create")}</button>
      </section>
    `;

    document.getElementById("createTutorBtn").addEventListener("click", () => {
      state.settings = { name: "JINHO", age: 5 };
      state.theme = document.getElementById("themeSelect").value;
      state.progress.streak = 1;
      state.tab = "home";
      save();
      render();
    });
  }

  function renderHome() {
    const pct = Math.round((state.progress.completed.length / curriculum.length) * 100);
    screenEl.innerHTML = `
      <section class="card hero">
        <div class="tutor-card">
          <div class="avatar">🧑🏻‍🎤</div>
          <div>
            <div class="tutor-name">Tutor Hana</div>
            <div class="muted">JINHO · Age 5</div>
          </div>
        </div>
        <div class="bubble">
          JINHO, ${state.lang === "en" ? "let’s play a Korean mission!" : "한국어 미션을 해봐요!"}
        </div>
        <button id="startMissionBtn">${T("start")}</button>
      </section>

      ${sceneHtml()}

      <section class="card story">
        <h3>${T("mission")}</h3>
        <p>${storyText()}</p>
      </section>

      <section class="card">
        <h2>${T("status")}</h2>
        <p class="muted">${T("completed")}: ${state.progress.completed.length} / ${curriculum.length}</p>
        <div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
        <div class="badge-row"><span class="badge">${themes[state.theme].icon} ${themes[state.theme][state.lang]}</span></div>
      </section>
    `;

    document.getElementById("startMissionBtn").addEventListener("click", () => goTab("lesson"));
  }

  function renderLesson() {
    if (state.progress.completed.length >= curriculum.length) {
      renderAllDone();
      return;
    }

    const lesson = currentLesson();
    const item = currentItem();
    const meaning = state.lang === "en" ? item.en : item.korean;

    screenEl.innerHTML = `
      <section class="card page-flip">
        <div class="muted">Mission ${state.lesson + 1} / ${curriculum.length} · Step ${state.item + 1} / ${lesson.items.length}</div>
        <div class="tutor-card">
          <div class="avatar">🧑🏻‍🎤</div>
          <div>
            <div class="tutor-name">Tutor Hana</div>
            <div class="muted">${lesson.goal[state.lang]}</div>
          </div>
        </div>
        <div class="bubble">JINHO, ${state.lang === "en" ? "your mission is to say " : "미션은 "}<b>${item.korean}</b>.</div>
      </section>

      ${sceneHtml()}

      <section class="card story">
        <h3>${themes[state.theme].icon} ${themes[state.theme][state.lang]} ${T("mission")}</h3>
        <p>${storyText()}</p>
      </section>

      <section class="card page-flip" id="phraseCard">
        <h2>${lesson.title[state.lang]}</h2>
        <div class="phrase">${item.korean}</div>
        <div class="roman">${item.roman}</div>
        <p>${meaning}</p>
        <p class="muted">${item.hint[state.lang]}</p>
        <div class="actions">
          <button id="listenBtn">${T("listen")}</button>
          <button class="secondary" id="slowListenBtn">${T("slow")}</button>
          <button class="warning" id="repeatBtn">${T("repeat")}</button>
          <button class="secondary" id="nextBtn">${isLastItem() ? T("finish") : T("next")}</button>
        </div>
      </section>

      <section class="card">
        <button class="big" id="scoreVoiceBtn">${T("scoreVoice")}</button>
        <div class="actions">
          <button class="secondary" id="speakBtn">${T("speak")}</button>
          <button class="secondary" id="skipBtn">${T("skip")}</button>
        </div>
        <div class="feedback">${state.feedback}</div>
        ${scoreHtml()}
        ${fallbackHtml()}
        ${recordHtml()}
        <p class="muted">${T("condition")}: ${state.correctRow} / ${requiredCorrect()} ${T("row")}</p>

        <div class="toggle-box">
          <h3>${T("write")}</h3>
          <button class="secondary" id="toggleWriteBtn">${T("showWrite")}</button>
          ${writeHtml()}
        </div>
      </section>
    `;

    document.getElementById("listenBtn").addEventListener("click", () => listen(false));
    document.getElementById("slowListenBtn").addEventListener("click", () => listen(true));
    document.getElementById("repeatBtn").addEventListener("click", () => listen(true));
    document.getElementById("nextBtn").addEventListener("click", nextItem);
    document.getElementById("scoreVoiceBtn").addEventListener("click", startVoiceScore);
    document.getElementById("speakBtn").addEventListener("click", startVoiceScore);
    document.getElementById("skipBtn").addEventListener("click", skipItem);
    document.getElementById("toggleWriteBtn").addEventListener("click", () => {
      state.write = !state.write;
      render();
    });

    const writeBtn = document.getElementById("checkWriteBtn");
    if (writeBtn) {
      writeBtn.addEventListener("click", () => {
        const input = document.getElementById("writeInput");
        applyScore(input ? input.value : "");
      });
    }

    const recordBtn = document.getElementById("recordBtn");
    if (recordBtn) recordBtn.addEventListener("click", startRecording);

    const stopBtn = document.getElementById("stopBtn");
    if (stopBtn) stopBtn.addEventListener("click", stopRecording);
  }

  function listen(slow) {
    const item = currentItem();
    const utterance = new SpeechSynthesisUtterance(item.korean);
    utterance.lang = "ko-KR";
    utterance.rate = slow ? 0.58 : 0.82;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function writeHtml() {
    if (!state.write) return "";
    return `
      <input class="input" id="writeInput" placeholder="${T("typeHere")}" />
      <button id="checkWriteBtn">${T("checkWrite")}</button>
    `;
  }

  function scoreHtml() {
    if (state.score === null && !state.recognized) return "";
    const score = state.score || 0;
    return `
      <div class="score-card page-flip">
        <h3>🎯 ${T("score")}</h3>
        <div class="score-big">${score}</div>
        <div class="score-bar"><div class="score-fill" style="width:${score}%"></div></div>
        <div class="score-row">
          <div class="score-mini">${T("target")}<br>${currentItem().korean}</div>
          <div class="score-mini">${T("recognized")}<br>${state.recognized || "-"}</div>
        </div>
      </div>
    `;
  }

  function fallbackHtml() {
    if (!state.fallback) return "";
    return `
      <div class="speech-fallback">
        <h3>${T("parent")}</h3>
        <p class="muted">${T("blocked")}</p>
      </div>
    `;
  }

  function recordHtml() {
    const audio = state.audioUrl ? `<audio controls src="${state.audioUrl}"></audio>` : "";
    return `
      <div class="record-box">
        <h3>🎙 ${T("record")}</h3>
        <p class="muted">${state.lang === "en" ? "Record JINHO’s real voice and play it back. This does not use parent scoring." : "JINHO의 실제 목소리를 녹음하고 다시 들어볼 수 있어요. 부모 점수 기능은 사용하지 않습니다."}</p>
        <div class="actions">
          <button id="recordBtn">${T("record")}</button>
          <button class="warning" id="stopBtn">${T("stop")}</button>
        </div>
        ${audio}
      </div>
    `;
  }

  function normalize(text) {
    return String(text || "")
      .trim()
      .replace(/[.?!]/g, "")
      .replace(/\s+/g, " ");
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
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
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

  function applyScore(spoken) {
    const item = currentItem();
    const score = similarityScore(spoken, item.korean);

    state.recognized = spoken || "-";
    state.score = score;
    state.progress.attempts += 1;

    if (score >= 90) {
      state.feedback = `<span class="good">${T("perfect")}</span>`;
      state.correctRow += 1;
      state.progress.correct += 1;
      addMastered(item.korean);
      if (state.correctRow >= requiredCorrect()) {
        save();
        setTimeout(nextItem, 700);
        return;
      }
    } else if (score >= 70) {
      state.feedback = `<span class="good">${T("good")}</span>`;
      state.correctRow += 1;
      state.progress.correct += 1;
      addMastered(item.korean);
    } else {
      state.feedback = `<span class="bad">${T("retry")}</span>`;
      state.correctRow = 0;
      addWeak(item.korean);
    }

    save();
    render();
  }

  function startVoiceScore() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      state.fallback = true;
      state.feedback = `<span class="bad">${T("blocked")}</span>`;
      render();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    state.fallback = false;
    state.feedback = state.lang === "en" ? "Listening..." : "듣고 있어요...";
    render();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      applyScore(spoken);
    };

    recognition.onerror = () => {
      state.fallback = true;
      state.feedback = `<span class="bad">${T("blocked")}</span>`;
      render();
    };

    try {
      recognition.start();
    } catch (error) {
      state.fallback = true;
      state.feedback = `<span class="bad">${T("blocked")}</span>`;
      render();
    }
  }

  function manualScore() {
    state.fallback = true;
    state.feedback = `<span class="bad">${T("blocked")}</span>`;
    render();
  }


  function getSupportedAudioMimeType() {
    if (typeof MediaRecorder === "undefined") return "";

    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/aac",
      ""
    ];

    for (const type of candidates) {
      try {
        if (!type || MediaRecorder.isTypeSupported(type)) return type;
      } catch (error) {
        // Continue to next candidate.
      }
    }

    return "";
  }

  function isSecureForMicrophone() {
    return window.isSecureContext || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  }

  async function startRecording() {
    if (!isSecureForMicrophone()) {
      state.feedback = `<span class="bad">HTTPS required. Open the GitHub Pages https:// address.</span>`;
      render();
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === "undefined") {
      state.feedback = `<span class="bad">${T("micBlocked")}</span>`;
      render();
      return;
    }

    try {
      stopStream();

      state.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      state.chunks = [];
      const mimeType = getSupportedAudioMimeType();
      const options = mimeType ? { mimeType } : undefined;
      state.recorder = new MediaRecorder(state.stream, options);

      state.recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          state.chunks.push(event.data);
        }
      };

      state.recorder.onerror = () => {
        stopStream();
        state.feedback = `<span class="bad">${T("micBlocked")}</span>`;
        render();
      };

      state.recorder.onstop = () => {
        try {
          const type = state.chunks[0] && state.chunks[0].type ? state.chunks[0].type : "audio/webm";
          const blob = new Blob(state.chunks, { type });
          if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
          state.audioUrl = URL.createObjectURL(blob);
          state.feedback = `<span class="good">${T("recorded")}</span>`;
        } catch (error) {
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
        state.feedback = state.lang === "en"
          ? "No active recording. Tap Record voice first."
          : "진행 중인 녹음이 없습니다. 먼저 음성 녹음을 눌러주세요.";
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
    if (!state.progress.mastered.includes(text)) {
      state.progress.mastered.push(text);
    }

    const weakIndex = state.progress.weak.indexOf(text);
    if (weakIndex >= 0) {
      state.progress.weak.splice(weakIndex, 1);
    }
  }

  function addWeak(text) {
    if (!state.progress.mastered.includes(text) && !state.progress.weak.includes(text)) {
      state.progress.weak.push(text);
    }
  }

  function skipItem() {
    addMastered(currentItem().korean);
    nextItem();
  }

  function nextItem() {
    state.feedback = "";
    state.score = null;
    state.recognized = "";
    state.fallback = false;
    state.write = false;
    state.correctRow = 0;

    if (!isLastItem()) {
      state.item += 1;
      save();
      render();
      setTimeout(() => {
        const phraseCard = document.getElementById("phraseCard");
        if (phraseCard) phraseCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      completeLesson();
    }
  }

  function completeLesson() {
    const id = currentLesson().id;

    if (!state.progress.completed.includes(id)) {
      state.progress.completed.push(id);
    }

    if (!isLastLesson()) {
      state.lesson += 1;
      state.item = 0;
      save();
      screenEl.innerHTML = `
        <section class="card hero page-flip">
          <h1>${T("done")}</h1>
          <button id="continueBtn">${T("continue")}</button>
        </section>
      `;
      document.getElementById("continueBtn").addEventListener("click", () => goTab("lesson"));
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
        <button id="resetDoneBtn">${T("reset")}</button>
      </section>
    `;
    document.getElementById("resetDoneBtn").addEventListener("click", resetProgress);
  }

  function renderReview() {
    let html = `<section class="card"><h1>${T("review")}</h1></section>`;
    const weak = state.progress.weak;

    if (!weak.length) {
      html += `<section class="card hero"><p class="muted">No weak items.</p></section>`;
    }

    weak.forEach((text, index) => {
      html += `
        <section class="card">
          <div class="phrase">${text}</div>
          <button data-review-index="${index}">${T("listen")}</button>
        </section>
      `;
    });

    screenEl.innerHTML = html;

    document.querySelectorAll("[data-review-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const text = weak[Number(button.dataset.reviewIndex)];
        listenText(text);
      });
    });
  }

  function renderSpeak() {
    screenEl.innerHTML = `
      <section class="card">
        <h1>${T("roleplay")}</h1>
        <p class="muted">${T("roleplayMsg")}</p>
      </section>
      ${sceneHtml()}
    `;
  }

  function renderProfile() {
    const accuracy = state.progress.attempts
      ? Math.round((state.progress.correct / state.progress.attempts) * 100)
      : 0;

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

  function listenText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.82;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function resetProgress() {
    state.progress = defaultProgress();
    state.lesson = 0;
    state.item = 0;
    state.correctRow = 0;
    state.feedback = "";
    state.score = null;
    state.recognized = "";
    state.fallback = false;
    save();
    render();
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
    button.addEventListener("click", () => {
      goTab(button.dataset.tab);
    });
  });

  render();
})();
