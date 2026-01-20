import { useEffect, useRef, useState } from "react";

export default function useVoice(onResult) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onResult(text);
    };

    recognitionRef.current = recognition;
  }, []);

  const start = () => recognitionRef.current?.start();

  return { start, listening };
}
