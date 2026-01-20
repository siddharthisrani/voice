export default function VoiceButton({ onSpeak, listening }) {
  return (
    <button
      onClick={onSpeak}
      className={`px-6 py-3 rounded-full text-white text-lg
        ${listening ? "bg-red-500" : "bg-indigo-600"}`}
    >
      {listening ? "🎙 Listening..." : "🎤 Ask Cybrom"}
    </button>
  );
}
