export default function VoiceButton({ onSpeak, listening }) {
  return (
    <button
      onClick={onSpeak}
      className={`w-16 h-16 rounded-full flex items-center justify-center
      shadow-xl transition
      ${listening ? "bg-red-500 scale-110" : "bg-indigo-500"}`}
    >
      🎤
    </button>
  );
}
