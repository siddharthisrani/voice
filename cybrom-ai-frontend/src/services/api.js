const API_URL = import.meta.env.VITE_API_URL;

export async function askAI(question) {
  const res = await fetch(`${API_URL}/api/ai/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  return res.json();
}
