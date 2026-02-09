# Voice-Based Authentication System

A full-stack voice authentication system that uses **OpenAI Whisper** for speech-to-text and voice phrase matching for signup and login. Users register with name, email, password, and a voice phrase, then sign in with the same phrase for verification.

---

## Features

- **Voice signup**: Register with name, email, password, and a recorded voice phrase
- **Voice login**: Sign in with email, password, and the same voice phrase
- **Speech-to-text**: OpenAI Whisper for transcription
- **Similarity matching**: Text similarity (e.g. difflib) to verify voice phrases
- **Responsive UI**: React + Vite + Tailwind; sliding auth layout, mobile and desktop
- **Password security**: Hashed passwords with Werkzeug

---

## Tech Stack

| Layer    | Technology |
| -------- | ---------- |
| Backend  | Python 3, Flask, SQLAlchemy, SQLite, OpenAI Whisper, Flask-CORS, Werkzeug |
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4, MediaRecorder API |

---

## Project Structure

```
VoiceBaseLogin/
├── backend/
│   ├── app.py              # Flask app, REST endpoints (signup, login, health)
│   ├── models.py            # SQLAlchemy User model
│   ├── whisper_service.py   # Whisper transcription (lazy-loaded)
│   ├── requirements.txt    # Python dependencies
│   ├── uploads/             # Stored audio files (created at runtime)
│   └── voice_auth.db        # SQLite DB (created at runtime)
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── signin.svg
│   │   └── signup.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── AudioRecorder.jsx   # Record / stop / playback
│   │   │   ├── SignInForm.jsx      # Login form + voice
│   │   │   ├── SignUpForm.jsx      # Signup form + voice
│   │   │   └── CloudDivider.jsx
│   │   ├── pages/
│   │   │   ├── SlidingAuth.jsx     # Auth layout (login/signup, sliding UI)
│   │   │   ├── Dashboard.jsx       # Post-login page
│   │   │   └── Dashboard.css
│   │   ├── services/
│   │   │   └── api.js              # signup(), login() API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css               # Tailwind + global styles
│   ├── package.json
│   ├── vite.config.js
│   └── .env                        # Optional: VITE_API_URL
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

### Prerequisites

- **Python 3.8+**
- **Node.js 18+** and **npm**
- **Microphone** for recording

### 1. Backend

```bash
cd backend
```

Create and activate a virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies and run the server:

```bash
pip install -r requirements.txt
python app.py
```

Backend runs at **http://localhost:5000**.  
First run may download the Whisper model (e.g. `tiny`); this can take a few minutes.

### 2. Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173** (or the port Vite prints).

### 3. Optional: API URL

If the backend is not on `http://localhost:5000`, set in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Restart the Vite dev server after changing `.env`.

---

## Usage

### Sign up

1. Open **http://localhost:5173/signup** (or use “Sign up” from the auth screen).
2. Enter **name**, **email**, and **password** (and confirm password).
3. Record a **voice phrase** (e.g. “My voice is my password”) and accept terms.
4. Submit. You are created in the DB and can go to login.

### Sign in

1. Open **http://localhost:5173/login** (or use “Sign in” from the auth screen).
2. Enter **email** and **password**.
3. Record the **same voice phrase** used at signup.
4. Submit. On success you are redirected to the **Dashboard**.

### Dashboard

After login you see the dashboard; user info is stored in `localStorage` for the session.

---

## Configuration

### Backend (`backend/app.py`)

| Setting | Default | Description |
| --------| --------| -----------|
| `SQLALCHEMY_DATABASE_URI` | `sqlite:///voice_auth.db` | SQLite DB path |
| `UPLOAD_FOLDER` | `uploads` | Directory for saved audio |
| `MAX_CONTENT_LENGTH` | 16 MB | Max upload size |

Similarity threshold for voice match is in the `login` route (e.g. `threshold = 0.75`). Adjust there if needed.

### Whisper model (`backend/whisper_service.py`)

Model is lazy-loaded on first use. Change the model name in `_get_model()`:

```python
_model = whisper.load_model("tiny")   # tiny | base | small | medium | large
```

- **tiny**: Fast, less accurate  
- **base**: Balanced  
- **small** / **medium** / **large**: Better accuracy, slower and heavier

### Frontend

- **API base URL**: Set `VITE_API_URL` in `frontend/.env` (see above).  
  Fallback is defined in `frontend/src/services/api.js`:  
  `import.meta.env.VITE_API_URL || 'http://localhost:5000'`

---

## Dependencies

### Backend (`backend/requirements.txt`)

| Package | Version | Purpose |
| --------| --------| --------|
| Flask | 3.0.0 | Web framework |
| flask-cors | 4.0.0 | CORS for React |
| flask-sqlalchemy | 3.1.1 | ORM |
| openai-whisper | 20231117 | Speech-to-text |
| torch | 2.1.0 | Whisper backend |
| torchaudio | 2.1.0 | Audio for Whisper |
| Werkzeug | 3.0.1 | Hashing, utils |

### Frontend (`frontend/package.json`)

| Package | Purpose |
| --------| --------|
| react, react-dom | UI |
| react-router-dom | Routing |
| tailwindcss, @tailwindcss/vite | Styling |
| vite, @vitejs/plugin-react | Build and dev server |
| lucide-react | Icons (if used) |

---

## Security (for production)

This is a **demo/educational** project. For production you would add:

- HTTPS, secure cookies / JWT
- Stronger voice verification (e.g. speaker verification)
- Rate limiting, input validation, secure headers
- No sensitive data in repo; use env and secrets

---

## Troubleshooting

| Issue | What to do |
| -----| ----------|
| Whisper model download fails | Check internet; first run downloads the model. Clear cache (e.g. `~/.cache/whisper`) if corrupted. |
| Port 5000 in use | Change in `app.py`: `app.run(debug=True, port=5001)` and set `VITE_API_URL` accordingly. |
| DB / schema errors | Ensure migrations in `app.py` have run. For a clean start, remove `voice_auth.db` and restart backend. |
| CORS errors | Ensure backend is running and `VITE_API_URL` (or default) matches the Flask URL. |
| Microphone not working | Use HTTPS or localhost; grant mic permission in the browser. |

---

## License

This project is for educational use. Use and adapt as needed, and add proper security for any production deployment.
