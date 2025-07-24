export default async function aiDraft(fastify, opts) {
  fastify.post('/api/ai-draft', async (req, reply) => {
    const { prompt } = req.body;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    // Router step
    const routerPrompt = `
You are an email assistant router.
Classify the input as "sales" or "follow-up":
User: "${prompt}"
Category:`;

    const routerRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-nano-2025-04-14",
        messages: [{ role: "system", content: routerPrompt }],
        max_tokens: 2,
        temperature: 0,
      }),
    }).then(res => res.json());

    const category = routerRes.choices[0].message.content.trim();

    // System prompt for specialized assistant
    let systemPrompt = "";
    if (category === "sales") {
      systemPrompt = `You are a Sales Email Assistant. Your task is to write a concise and engaging sales email (under 40 words). The subject line and body of the email should be optimized to encourage a response. Provide the subject and body content separately, keeping the body within 7-10 words per sentence. Start the email with 'Hey there!\n' and end with '\nBest regards, \nSerban. The email's purpose is: ${prompt}. Output format: Subject:  \nBody:`;
    } else {
      systemPrompt = `You are a Follow-up Email Assistant. Your task is to write a concise (under 40 words), polite follow-up email. The subject line and body of the email should be focused on checking up with a follow up. Provide the subject and body content separately. Start the email with 'Hey there!\n' and end with '\nBest regards, \nSerban. The email's purpose is: ${prompt}. Output format: Subject:  \nBody:`;
    }


    const draftRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-nano-2025-04-14",
        messages: [{ role: "system", content: systemPrompt }],
        max_tokens: 100,
        temperature: 0.7,
      }),
    }).then(res => res.json());

    const text = draftRes.choices[0].message.content;
    const subjectMatch = text.match(/Subject:(.*)/i);
    const bodyMatch = text.match(/Body:(.*)/is);

    reply.send({
      subject: subjectMatch ? subjectMatch[1].trim() : '',
      body: bodyMatch ? bodyMatch[1].trim() : text,
    });
  });
};
