import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Icon from "./Icons";
import { inr } from "../utils/helpers";

export default function VoiceConcierge() {
  const { s } = useStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [caption, setCaption] = useState(
    "Namaste! I am your AI Vivah Concierge. Tap any voice topic below or use the microphone to ask me about your wedding!"
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [micSupported, setMicSupported] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Initialize Speech Synthesis & Voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const availableVoices = synthRef.current.getVoices();
        setVoices(availableVoices);

        // Prefer Indian English voice, or UK/US natural voice
        const preferred =
          availableVoices.find((v) => v.lang.includes("en-IN") || v.name.toLowerCase().includes("india")) ||
          availableVoices.find((v) => v.name.toLowerCase().includes("natural") && v.lang.startsWith("en")) ||
          availableVoices.find((v) => v.lang.startsWith("en-GB")) ||
          availableVoices.find((v) => v.lang.startsWith("en-US")) ||
          availableVoices[0];

        setSelectedVoice(preferred || null);
      };

      loadVoices();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }

    // Initialize Web Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
        setCaption("🎙️ Listening... Please speak your question (e.g. 'What is my budget?', 'Show venues in Jaipur')");
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setIsListening(false);
        handleUserSpeechCommand(text);
      };

      recognition.onerror = (err) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
        setCaption("Couldn't catch that clearly. Please try speaking again or click one of the quick voice topics below!");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setMicSupported(false);
    }

    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []); // eslint-disable-line

  // Text-To-Speech Speaker Function
  const speak = (text) => {
    if (!synthRef.current) return;

    // Stop ongoing speech
    synthRef.current.cancel();

    setCaption(text);
    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.96;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Toggle Microphone Listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Microphone speech recognition is not supported in this browser. Please use Chrome or Edge, or click the quick voice topics!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Smart Context-Aware Speech Handler
  const handleUserSpeechCommand = (spokenText) => {
    const query = spokenText.toLowerCase();

    if (query.includes("budget") || query.includes("cost") || query.includes("expense") || query.includes("paisa") || query.includes("kharcha")) {
      handleBudgetQuery();
    } else if (query.includes("venue") || query.includes("palace") || query.includes("hotel") || query.includes("resort")) {
      handleVenuesQuery();
    } else if (query.includes("catering") || query.includes("food") || query.includes("khana") || query.includes("menu")) {
      handleCateringQuery();
    } else if (query.includes("photo") || query.includes("cinema") || query.includes("camera") || query.includes("video")) {
      handlePhotoQuery();
    } else if (query.includes("muhurat") || query.includes("date") || query.includes("panchang") || query.includes("auspicious")) {
      handleMuhuratsQuery();
    } else if (query.includes("task") || query.includes("checklist") || query.includes("ceremony") || query.includes("ritual")) {
      handleTasksQuery();
    } else if (query.includes("ai") || query.includes("insight") || query.includes("theme") || query.includes("style")) {
      handleInsightsQuery();
    } else {
      speak(`You asked: "${spokenText}". As your AI Vivah Concierge, I can guide you through venues, budget allocations, Vedic dates, and ceremony tasks. Let me take you to our curated directory.`);
      navigate("/vendors");
    }
  };

  // Query Responses
  const handleWelcome = () => {
    speak(
      "Namaste and welcome to ShadiMubarak Luxury Wedding Studio. I am your personal AI Vivah Concierge. I can help you discover verified heritage palaces, calibrate your wedding budget, or align your cultural ceremony dates. What would you like to explore?"
    );
  };

  const handleBudgetQuery = () => {
    const spent = s.expenses.reduce((a, e) => a + e.amt, 0);
    const remaining = Math.max(0, s.budget - spent);
    speak(
      `Your total wedding budget target is ${inr(s.budget)}. You have allocated ${inr(spent)} so far, with ${inr(remaining)} remaining. Opening your Planner and Budget accounts now.`
    );
    navigate("/planner");
  };

  const handleVenuesQuery = () => {
    speak(
      "We have verified royal heritage palaces like Rang Mahal Palace in Jaipur and Lotus Greens in Udaipur with locked pricing and rain backup guarantees. Opening palatial venues for you."
    );
    navigate("/vendors?cat=Venue");
  };

  const handleCateringQuery = () => {
    speak(
      "Explore royal khansama catering partners like Saffron Table and Royal Zaika, featuring authentic Awadhi, Marwari, and gourmet live counters. Navigating to catering partners."
    );
    navigate("/vendors?cat=Catering");
  };

  const handlePhotoQuery = () => {
    speak(
      "For cinematic wedding films and royal portraiture, explore Frame Stories and Candid Karma in our directory. Opening cinematography partners now."
    );
    navigate("/vendors?cat=Photography");
  };

  const handleMuhuratsQuery = () => {
    speak(
      "For 2027, prime Vedic auspicious wedding dates include February 14th Vasant Panchami, April 21st Akshaya Tritiya, and November 28th Dev Uthani Ekadashi. Opening your Ceremony Calendar."
    );
    navigate("/planner");
  };

  const handleTasksQuery = () => {
    const all = s.events.flatMap((e) => e.tasks);
    const done = all.filter((t) => t.done).length;
    speak(
      `You have completed ${done} out of ${all.length} ceremony milestones. Stay on track by reviewing your rituals inside the Wedding Planner.`
    );
    navigate("/planner");
  };

  const handleInsightsQuery = () => {
    speak(
      `Your active wedding aesthetic is ${s.theme}. Based on your browsing and budget data, our rule-based AI recommends prioritizing floral mandap styling. Opening AI Styling Insights now.`
    );
    navigate("/insights");
  };

  return (
    <>
      {/* Floating Interactive Trigger Button */}
      <div className="voice-floating-container">
        {/* Subtle Welcome Hint Callout */}
        {!isOpen && !isSpeaking && (
          <div className="voice-hint-bubble" onClick={() => { setIsOpen(true); handleWelcome(); }}>
            <span className="sparkle">✨</span>
            <span>Tap to talk with <strong>AI Vivah Concierge</strong></span>
          </div>
        )}

        <button
          className={`voice-trigger-btn ${isSpeaking ? "speaking-pulse" : ""} ${isListening ? "listening-pulse" : ""}`}
          onClick={() => {
            const nextOpen = !isOpen;
            setIsOpen(nextOpen);
            if (nextOpen && !isSpeaking) {
              handleWelcome();
            } else if (!nextOpen) {
              stopSpeaking();
            }
          }}
          title="Open AI Vivah Voice Assistant"
          aria-label="Open AI Vivah Voice Assistant"
        >
          {isSpeaking ? (
            <div className="soundwave-anim">
              <span className="wave-bar bar-1"></span>
              <span className="wave-bar bar-2"></span>
              <span className="wave-bar bar-3"></span>
              <span className="wave-bar bar-4"></span>
            </div>
          ) : isListening ? (
            <Icon name="mic" size={22} color="#fff" />
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "1.25rem" }}>🎙️</span>
              <span className="trigger-label">AI Voice Concierge</span>
            </div>
          )}
        </button>
      </div>

      {/* Luxury Voice Concierge Dialog Drawer */}
      {isOpen && (
        <div className="voice-dialog-card">
          {/* Header */}
          <div className="voice-dialog-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="voice-avatar-ring">
                <span style={{ fontSize: "1.4rem" }}>🪔</span>
              </div>
              <div>
                <b style={{ color: "#fff", fontSize: "0.98rem", display: "block" }}>AI Vivah Concierge</b>
                <span style={{ color: "var(--gold-soft)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                  Interactive Voice Intelligence
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {isSpeaking && (
                <button className="voice-icon-btn" onClick={stopSpeaking} title="Stop Speaking">
                  <Icon name="volumeX" size={16} color="var(--rose-soft)" />
                </button>
              )}
              <button className="voice-icon-btn" onClick={() => { stopSpeaking(); setIsOpen(false); }} title="Close">
                <Icon name="x" size={16} />
              </button>
            </div>
          </div>

          {/* Dynamic Status Strip */}
          <div className="voice-status-strip">
            {isSpeaking ? (
              <div className="status-item active-speaking">
                <Icon name="volume" size={14} color="var(--gold-rich)" />
                <span>AI Speaking via Speech Synthesis</span>
                <div className="mini-equalizer">
                  <span></span><span></span><span></span>
                </div>
              </div>
            ) : isListening ? (
              <div className="status-item active-listening">
                <span className="pulse-red-dot"></span>
                <span>Listening to your voice... Speak now!</span>
              </div>
            ) : (
              <div className="status-item idle">
                <Icon name="sparkles" size={14} color="var(--gold)" />
                <span>Ready to assist your wedding</span>
              </div>
            )}
          </div>

          {/* Live Caption & Speech Bubble */}
          <div className="voice-caption-box">
            <p className="voice-caption-text">
              "{caption}"
            </p>
          </div>

          {/* Voice Input Controls */}
          {micSupported && (
            <div style={{ textAlign: "center", margin: "14px 0" }}>
              <button
                className={`voice-mic-main-btn ${isListening ? "mic-recording" : ""}`}
                onClick={toggleListening}
              >
                <Icon name={isListening ? "micOff" : "mic"} size={18} />
                <span>{isListening ? "Listening... Tap to Stop" : "Tap & Speak to AI Assistant"}</span>
              </button>
            </div>
          )}

          {/* Quick Voice Topics (One-Tap Audio) */}
          <div className="voice-topics-section">
            <small style={{ color: "var(--gold-soft)", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px", fontWeight: 700 }}>
              Quick Audio Guidance Topics:
            </small>
            <div className="voice-topics-grid">
              <button className="voice-topic-pill" onClick={handleWelcome}>
                <span>👋 Welcome Greeting</span>
              </button>
              <button className="voice-topic-pill" onClick={handleBudgetQuery}>
                <span>💰 Budget Status</span>
              </button>
              <button className="voice-topic-pill" onClick={handleVenuesQuery}>
                <span>🏰 Royal Palaces</span>
              </button>
              <button className="voice-topic-pill" onClick={handleCateringQuery}>
                <span>🍲 Royal Catering</span>
              </button>
              <button className="voice-topic-pill" onClick={handlePhotoQuery}>
                <span>📸 Cinema &amp; Photo</span>
              </button>
              <button className="voice-topic-pill" onClick={handleMuhuratsQuery}>
                <span>🌸 2027 Muhurats</span>
              </button>
              <button className="voice-topic-pill" onClick={handleTasksQuery}>
                <span>📋 Ritual Milestones</span>
              </button>
              <button className="voice-topic-pill" onClick={handleInsightsQuery}>
                <span>🤖 AI Theme Insights</span>
              </button>
            </div>
          </div>

          {/* Footer Audio Options */}
          {voices.length > 0 && (
            <div className="voice-footer-select">
              <label>Voice Accent:</label>
              <select
                value={selectedVoice?.name || ""}
                onChange={(e) => {
                  const v = voices.find((x) => x.name === e.target.value);
                  if (v) setSelectedVoice(v);
                }}
              >
                {voices.slice(0, 10).map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </>
  );
}
