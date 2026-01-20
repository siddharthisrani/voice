export default function ChatBox({ question, answer }) {
  return (
    <div className="mt-6 space-y-4">
      {question && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <b>You:</b> {question}
        </div>
      )}

      {answer && (
        <div className="bg-indigo-100 p-4 rounded-lg">
          <b>Cybrom AI:</b> {answer}
        </div>
      )}
    </div>
  );
}
