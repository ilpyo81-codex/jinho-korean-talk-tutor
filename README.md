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
