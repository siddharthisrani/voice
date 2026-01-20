import { useState,useEffect } from "react";
import useVoice from "./hooks/useVoice";
import { askAI } from "./services/api";
import VoiceButton from "./components/VoiceButton";
import ChatBox from "./components/ChatBox";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
}, []);


function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "hi-IN"; // switch to Hindi base
  utter.rate = 0.95;
  utter.pitch = 1.15;

  const voices = speechSynthesis.getVoices();
  const indianVoice =
    voices.find(v => v.lang === "hi-IN") ||
    voices.find(v => v.lang === "en-IN") ||
    voices[0];

  utter.voice = indianVoice;
  speechSynthesis.speak(utter);
}


function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/\bsar\b/g, "sir")
    .replace(/\bmadam\b|\bmaam\b/g, "mam")
    .replace(/\bfloor\b|\bflor\b/g, "floor")
    .replace(/\s+/g, " ")
    .trim();
}

 const handleVoice = async (rawText) => {
  const normalizedText = normalizeText(rawText);

  setQuestion(normalizedText);

  const res = await askAI(normalizedText);
  setAnswer(res.answer);

  speak(res.answer);
};


  const { start, listening } = useVoice(handleVoice);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Cybrom Voice AI</h1>

      <VoiceButton onSpeak={start} listening={listening} />
      <ChatBox question={question} answer={answer} />
    </div>
  );
}
