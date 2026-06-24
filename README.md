# JINHO Korean Talk Tutor

A conversation-style Korean tutor prototype for JINHO.

## Concept

Tutor Hana explains a game situation, speaks the situation aloud, introduces a Korean expression, speaks the Korean expression, and JINHO follows.

## Features

- Chat-style tutor interface
- Tutor situation text + voice
- Korean expression text + voice
- Auto voice ON / OFF
- Minecraft / Roblox / Pokémon / Super Mario skins
- Voice score attempt using browser speech recognition
- Real voice recording and playback
- No parent score buttons
- English / Korean UI toggle
- GitHub Pages ready

## File structure

```text
index.html
style.css
data.js
app.js
README.md
```

## How to publish

Upload all files to the root of your GitHub repository and enable GitHub Pages:

```text
Settings → Pages → Deploy from a branch → main → / root → Save
```

## Important note

The automatic voice score uses the browser's speech recognition. It may not work in all Android browsers. Recording and playback should work on HTTPS pages if microphone permission is allowed.


## Cache fix

This version adds cache-busting query strings:

```html
style.css?v=talk2
data.js?v=talk2
app.js?v=talk2
```

This forces GitHub Pages and Chrome to load the new conversation-style app instead of the old cached card-style app.


## Chat mic update talk3

This version makes the lesson more like a real conversation:

- Tutor Hana appears in chat bubbles.
- JINHO also appears in the chat when he speaks.
- The microphone button is part of the conversation flow.
- Recognized Korean speech is shown as JINHO's chat bubble.
- If the score is high enough, Tutor Hana reacts and moves to the next chat.
- If the score is low, Tutor Hana asks JINHO to try again.
- Tutor TTS uses higher pitch/rate for a more playful streamer-like feel, within browser TTS limits.


## Chat-only update talk4

This version removes the separate expression/game cards from the lesson screen.

Everything happens inside the Tutor chat:
- Tutor explains the situation.
- Tutor gives the Korean expression in a chat bubble.
- JINHO taps the mic to reply.
- The recognized speech appears as JINHO's chat bubble.
- Tutor replies in the same chat.
- High score moves to the next chat.
- Low score asks JINHO to try again.
