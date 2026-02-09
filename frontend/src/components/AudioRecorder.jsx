import React, { useState, useRef, useEffect } from 'react';
import AudioRecorderUtil from '../utils/AudioRecorder';

/**
 * Audio Recorder Component
 * Provides recording, playback, and audio preview functionality
 */
function AudioRecorder({ onRecordingComplete, disabled = false }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [error, setError] = useState(null);
  
  const audioRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Cleanup audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    try {
      setError(null);
      const recorder = new AudioRecorderUtil();
      audioRecorderRef.current = recorder;
      await recorder.startRecording();
      setIsRecording(true);
    } catch (err) {
      setError(err.message);
      console.error('Recording error:', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!audioRecorderRef.current) return;

      const blob = await audioRecorderRef.current.stopRecording();
      const url = audioRecorderRef.current.createAudioURL(blob);
      
      setAudioBlob(blob);
      setAudioURL(url);
      setIsRecording(false);
      
      // Notify parent component
      if (onRecordingComplete) {
        onRecordingComplete(blob);
      }
    } catch (err) {
      setError(err.message);
      console.error('Stop recording error:', err);
    }
  };

  const resetRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioBlob(null);
    setAudioURL(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {!isRecording && !audioBlob && (
          <button
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={startRecording}
            disabled={disabled}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            Start Recording
          </button>
        )}
        
        {isRecording && (
          <button
            className="flex items-center gap-2 bg-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={stopRecording}
            disabled={disabled}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h12v12H6z"/>
            </svg>
            Stop Recording
          </button>
        )}

        {audioBlob && !isRecording && (
          <button
            className="flex items-center gap-2 bg-cyan-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={resetRecording}
            disabled={disabled}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
            </svg>
            Record Again
          </button>
        )}
      </div>

      {isRecording && (
        <div className="flex items-center gap-2 text-pink-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="text-xs font-medium">Recording...</span>
        </div>
      )}

      {audioBlob && audioURL && (
        <div className="w-full text-center">
          <p className="text-xs text-gray-600 mb-1">Preview:</p>
          <audio
            ref={audioPlayerRef}
            src={audioURL}
            controls
            className="w-full h-6"
          />
        </div>
      )}

      {error && (
        <div className="text-red-500 text-xs bg-red-50 px-3 py-1 rounded">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
