export default function ChatBox({ question, answer }) {
  return (
    <div className="space-y-4">

      {question && (
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-indigo-600 px-4 py-2 rounded-2xl rounded-br-sm">
            {question}
          </div>
        </div>
      )}

      {answer && (
        <div className="flex justify-start">
          <div className="max-w-[80%] bg-white/10 px-4 py-2 rounded-2xl rounded-bl-sm">
            {answer}
          </div>
        </div>
      )}

    </div>
  );
}
