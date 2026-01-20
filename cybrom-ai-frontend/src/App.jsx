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
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white flex flex-col">

    {/* Header */}
    <div className="p-4 text-center font-semibold text-lg border-b border-white/10">
      Cybrom AI Assistant
    </div>

    {/* Chat Area */}
    <div className="flex-1 overflow-y-auto p-4">
      <ChatBox question={question} answer={answer} />
    </div>

    {/* Mic Button */}
    <div className="p-4 flex justify-center">
      <VoiceButton onSpeak={start} listening={listening} />
    </div>
  </div>
);

}
