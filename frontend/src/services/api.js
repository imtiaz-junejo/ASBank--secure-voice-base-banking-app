/**
 * API service for communicating with Flask backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Convert audio blob to WAV format for backend compatibility
 * @param {Blob} audioBlob - Original audio blob
 * @returns {Promise<Blob>} - WAV formatted blob
 */
async function convertToWAV(audioBlob) {
  // For simplicity, we'll send the blob as-is
  // In production, you might want to convert webm to wav using AudioContext
  // For now, Flask/Whisper can handle webm format
  return audioBlob;
}

/**
 * Sign up a new user
 * @param {string} name - Full name
 * @param {string} email - User email
 * @param {string} password - Password
 * @param {Blob} audioBlob - Recorded audio blob
 * @returns {Promise<Object>} - API response
 */
export async function signup(name, email, password, audioBlob) {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    const wavBlob = await convertToWAV(audioBlob);
    formData.append('audio', wavBlob, 'recording.webm');

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }
    return data;
  } catch (error) {
    throw new Error(`Signup error: ${error.message}`);
  }
}

/**
 * Login with email, password and voice authentication
 * @param {string} email - User email
 * @param {string} password - Password
 * @param {Blob} audioBlob - Recorded audio blob
 * @returns {Promise<Object>} - API response
 */
export async function login(email, password, audioBlob) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const wavBlob = await convertToWAV(audioBlob);
    formData.append('audio', wavBlob, 'recording.webm');

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    return data;
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
}
