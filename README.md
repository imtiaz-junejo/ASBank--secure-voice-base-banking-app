# Voice-Based Authentication System

A full-stack voice authentication system that uses OpenAI Whisper for speech-to-text conversion and voice phrase matching for secure login.

## 🎯 Features

- **Voice Signup**: Users register with email/username and record a voice phrase
- **Voice Login**: Users authenticate by recording the same voice phrase
- **Speech-to-Text**: Powered by OpenAI Whisper for accurate transcription
- **Similarity Matching**: Uses text similarity algorithms to verify voice phrases
- **Modern UI**: Clean, responsive React frontend with audio recording capabilities

## 🛠️ Tech Stack

### Backend
- **Python Flask**: RESTful API server
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Lightweight database
- **OpenAI Whisper**: Speech-to-text transcription
- **Flask-CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: Modern React with functional components and hooks
- **React Router**: Client-side routing
- **MediaRecorder API**: Browser-based audio recording

## 📁 Project Structure

```
VoiceBaseLogin/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── models.py              # SQLAlchemy database models
│   ├── whisper_service.py     # Whisper transcription service
│   ├── requirements.txt       # Python dependencies
│   ├── uploads/               # Audio file storage (created automatically)
│   └── voice_auth.db          # SQLite database (created automatically)
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AudioRecorder.js      # Audio recording component
│   │   │   └── AudioRecorder.css
│   │   ├── pages/
│   │   │   ├── Signup.js             # Signup page
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Dashboard.js          # Dashboard page
│   │   │   ├── Auth.css              # Auth page styles
│   │   │   └── Dashboard.css         # Dashboard styles
│   │   ├── services/
│   │   │   └── api.js                # API service functions
│   │   ├── utils/
│   │   │   └── audioRecorder.js      # Audio recording utility
│   │   ├── App.js                    # Main app component
│   │   ├── App.css
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- **Python 3.8+** installed
- **Node.js 16+** and **npm** installed
- **Microphone** access for recording

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

   **Note:** Installing Whisper and PyTorch may take several minutes as they download large model files.

4. **Run the Flask server:**
   ```bash
   python app.py
   ```

   The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000` and automatically open in your browser.

## 📝 Usage

### Signup Process

1. Navigate to the Signup page (or `/signup`)
2. Enter your email and username
3. Click "Start Recording" and say your voice phrase (e.g., "My voice is my password")
4. Click "Stop Recording" when finished
5. Preview your recording using the audio player
6. Click "Sign Up" to create your account

### Login Process

1. Navigate to the Login page (or `/login`)
2. Enter your email or username
3. Click "Start Recording" and say the **same** voice phrase you used during signup
4. Click "Stop Recording" when finished
5. Click "Login" to authenticate

### Dashboard

After successful login, you'll be redirected to the Dashboard showing your account information.

## 🔧 Configuration

### Backend Configuration

The backend can be configured by modifying `backend/app.py`:

- **Database URI**: Change `SQLALCHEMY_DATABASE_URI` to use a different database
- **Upload Folder**: Modify `UPLOAD_FOLDER` to change where audio files are stored
- **Max File Size**: Adjust `MAX_CONTENT_LENGTH` for larger audio files
- **Similarity Threshold**: Modify the `threshold` value in the `login()` function (default: 0.75)

### Whisper Model

You can change the Whisper model size in `backend/whisper_service.py`:

- `tiny`: Fastest, least accurate
- `base`: Balanced (default)
- `small`: Better accuracy
- `medium`: High accuracy
- `large`: Best accuracy, slowest

```python
_model = whisper.load_model("base")  # Change "base" to desired model
```

### Frontend Configuration

The API base URL can be configured in `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Or set it via environment variable:
```bash
# Create .env file in frontend directory
REACT_APP_API_URL=http://localhost:5000
```

## 🔐 Security Considerations

This is a **demo/educational project**. For production use, consider:

- **HTTPS**: Use SSL/TLS for secure communication
- **Token-based Auth**: Implement JWT tokens for session management
- **Audio Encryption**: Encrypt stored audio files
- **Rate Limiting**: Prevent brute force attacks
- **Better Similarity**: Use advanced voice recognition algorithms (e.g., speaker verification)
- **Environment Variables**: Store sensitive data in `.env` files
- **Input Validation**: Add more robust input validation
- **Error Handling**: Improve error messages to avoid information leakage

## 🐛 Troubleshooting

### Backend Issues

**Issue: Whisper model download fails**
- Solution: Ensure you have a stable internet connection. The first run downloads the model (~150MB for base model).

**Issue: Port 5000 already in use**
- Solution: Change the port in `app.py`: `app.run(debug=True, port=5001)`

**Issue: Database errors**
- Solution: Delete `voice_auth.db` and restart the server to recreate the database.

### Frontend Issues

**Issue: Microphone access denied**
- Solution: Grant microphone permissions in your browser settings.

**Issue: CORS errors**
- Solution: Ensure Flask-CORS is installed and the backend is running on the correct port.

**Issue: Audio recording not working**
- Solution: Use a modern browser (Chrome, Firefox, Edge). Ensure HTTPS or localhost (MediaRecorder requires secure context).

## 📦 Dependencies

### Backend (`requirements.txt`)
- Flask==3.0.0
- flask-cors==4.0.0
- flask-sqlalchemy==3.1.1
- openai-whisper==20231117
- torch==2.1.0
- torchaudio==2.1.0
- Werkzeug==3.0.1

### Frontend (`package.json`)
- react==18.2.0
- react-dom==18.2.0
- react-router-dom==6.20.0
- react-scripts==5.0.1

## 🎨 Features Overview

- ✅ User signup with voice phrase
- ✅ User login with voice authentication
- ✅ Audio recording with MediaRecorder API
- ✅ Audio playback preview
- ✅ Speech-to-text transcription with Whisper
- ✅ Text similarity matching
- ✅ Clean, modern UI
- ✅ Responsive design
- ✅ Error handling and validation

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📧 Support

For issues or questions, please open an issue on the repository.

---

**Note**: This is a demonstration project. For production applications, implement additional security measures and use professional voice recognition services.
