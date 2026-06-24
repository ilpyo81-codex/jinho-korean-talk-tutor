# JINHO Korean Tutor

A small Korean speaking tutor web app for JINHO.

## Features

- JINHO-only Korean tutor prototype
- Age 5 friendly phrases
- English / Korean UI toggle
- Game skin switcher
  - Minecraft
  - Roblox
  - Pokémon
  - Super Mario
- Continuing story by sentence
- Korean Listen button using browser TTS
- Voice Score using browser speech recognition + text similarity
- Parent score fallback when speech recognition is blocked
- Voice recording and playback
- Optional writing practice
- Review and profile pages
- Mobile-first layout
- GitHub Pages ready

## File structure

```text
jinho-korean-tutor/
├─ index.html
├─ style.css
├─ data.js
├─ app.js
└─ README.md
```

## How to publish with GitHub Pages

1. Create a new GitHub repository named:

```text
jinho-korean-tutor
```

2. Upload these files to the repository root:

```text
index.html
style.css
data.js
app.js
README.md
```

3. Go to:

```text
Settings → Pages
```

4. Set:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

5. Click Save.

6. After a few minutes, open:

```text
https://YOUR-GITHUB-USERNAME.github.io/jinho-korean-tutor/
```

Example:

```text
https://ilpyo81.github.io/jinho-korean-tutor/
```

## Notes about microphone

Voice recognition and recording usually require HTTPS.

GitHub Pages gives you an HTTPS address, so microphone features should work better than opening the file directly from Android `content://`.

The Voice Score feature is not true phoneme-level pronunciation scoring. It uses browser speech recognition and compares the recognized Korean text with the target sentence. For advanced pronunciation scoring, a server-side speech model or pronunciation API would be needed.

## Updating content later

Most phrase and story updates can be made in:

```text
data.js
```

You usually do not need to change `index.html`, `style.css`, or `app.js` for simple story updates.


## Recording fix update

If recording did not work on Android Chrome:

1. Upload the updated `app.js` from this package.
2. Commit the change.
3. Wait 1-3 minutes for GitHub Pages to update.
4. Open the GitHub Pages URL again.
5. Allow microphone permission.
6. Tap Record voice, say the sentence, then tap Stop.


## No parent score update

This update removes the Parent Score buttons.

Now:
- Score my voice tries automatic browser speech recognition only.
- If automatic speech scoring is not available, it shows an explanation.
- Record voice is for real voice recording and playback.
- Parents do not manually score the child in this version.
