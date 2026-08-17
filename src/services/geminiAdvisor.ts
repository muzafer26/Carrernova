/**
 * CareerNova Gemini AI Advisor Service
 * Powers live conversational counseling using Google Gemini API.
 */

const GEMINI_API_KEY = "AQ.Ab8RN6KwFzbnprI0VlKp45NKqQrL4i7k9FECgYx9dlEBEHIMcA";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION = `You are CareerNova AI, an expert, empathetic, and source-backed Career & Education Advisor specifically for students in Jammu & Kashmir (J&K), India.

Core Responsibilities:
1. Guide Class 10 and Class 12 students in J&K on selecting academic streams (Science PCM/PCB, Commerce, Arts/Humanities) or vocational ITI trades (Electrician, COPA, Plumbing, Welder).
2. Explain undergraduate degree choices (B.Sc Computer Science, B.Sc Biotechnology, B.Com, BBA, B.A. Humanities, BCA, B.Tech) across Government Degree Colleges (GDCs) in J&K districts (Srinagar, Jammu, Kathua, Anantnag, Baramulla, Udhampur, Rajouri, Poonch, Pulwama, Kupwara, Doda, etc.).
3. Provide guidance on official J&K admission processes: J&K Samarth portal (jk.samarth.ac.in), JKBOPEE (jkbopee.gov.in), DSD ITI admissions (jkdsd.in), CUET UG, and PMSSS Prime Minister Special Scholarship Scheme for J&K students.
4. Keep responses encouraging, well-structured with clear markdown headings and bullet points, concise, and 100% focused on J&K student success.`;

export interface ChatMessage {
  role: "user" | "model" | "assistant";
  text: string;
}

/**
 * Generate Gemini AI Advisor response given chat history and user prompt
 */
export async function askGeminiAdvisor(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    // Format conversation history for Gemini API payload
    const contents = [
      ...history.map((m) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      })),
      {
        role: "user",
        parts: [{ text: userQuery }],
      },
    ];

    const bodyPayload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Gemini API endpoint returned error:", res.status, errText);
      // Try fallback model if gemini-1.5-flash needs standard v1 endpoint
      return await askGeminiFallback(userQuery, history);
    }

    const data = await res.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (candidateText && candidateText.trim().length > 0) {
      return candidateText;
    }

    return "CareerNova AI is ready! Please check your question or ask about degree courses, streams, or colleges in J&K.";
  } catch (err) {
    console.error("Gemini API call failed:", err);
    return await askGeminiFallback(userQuery, history);
  }
}

/**
 * Fallback handler using secondary endpoint format
 */
async function askGeminiFallback(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    const contents = [
      {
        role: "user",
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${userQuery}` }],
      },
    ];

    const res = await fetch(fallbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidateText) return candidateText;
  } catch (e) {
    console.warn("Fallback call error:", e);
  }

  // Smart local offline fallback for J&K queries
  return getLocalJKGuidance(userQuery);
}

/**
 * Instant local offline guidance fallback for J&K students
 */
function getLocalJKGuidance(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("class 10") || q.includes("stream")) {
    return `### Academic Streams After Class 10 in J&K\n\n1. **Science Stream (PCM / PCB):**\n   - **PCM:** Physics, Chemistry, Mathematics (Prepares for B.Tech, B.Sc CS, BCA, Architecture).\n   - **PCB:** Physics, Chemistry, Biology (Prepares for MBBS, BDS, B.Sc Biotechnology, B.Sc Nursing, Botany/Zoology).\n\n2. **Commerce Stream:**\n   - Accountancy, Business Studies, Economics, Entrepreneurship (Prepares for B.Com, BBA, CA Foundation).\n\n3. **Arts / Humanities Stream:**\n   - Political Science, History, Sociology, Economics, Languages (Prepares for B.A., Civil Services JKPSC, Law BA LLB).\n\n4. **Skill & Vocational (ITI):**\n   - Electrician, Computer Operator (COPA), Plumber, Welder (1-2 year direct employment certificates via J&K DSD).`;
  }

  if (q.includes("college") || q.includes("gdc") || q.includes("srinagar") || q.includes("jammu")) {
    return `### Key Government Degree Colleges (GDCs) in Jammu & Kashmir\n\n- **Jammu District:** GDC Kathua, GDC Akhnoor, GDC Boys Udhampur, MAM College Jammu.\n- **Srinagar District:** SP College Srinagar, Amar Singh College, GDC Bemina, Women's College M.A. Road.\n- **Anantnag & Baramulla:** GDC Boys Anantnag, GDC Sopore, GDC Baramulla.\n\n*Admissions for undergraduate degree programs across all J&K GDCs are conducted through the official J&K Samarth portal (jk.samarth.ac.in).*`;
  }

  return `### CareerNova J&K Student Advisory\n\nThank you for reaching out! You can explore education pathways in J&K:\n- **Class 10 Students:** Focus on subject interest discovery between Science, Commerce, and Arts.\n- **Class 12 Students:** Explore 3-year and 4-year NEP 2020 undergraduate degree courses across J&K Government Degree Colleges.\n- **Scholarships:** Apply for PMSSS (Prime Minister's Special Scholarship Scheme for J&K) on the official AICTE PMSSS portal.`;
}
