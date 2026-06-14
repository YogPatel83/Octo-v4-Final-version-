export async function executeTwilioAdapter(input: {
  action: string;
  payload: Record<string, unknown>;
  api_key: string;
}) {
  const payload = input.payload || {};

  if (input.action !== "make_call" && input.action !== "send_sms") {
    return {
      ok: false,
      status: "failed",
      output: null,
      error: `Unsupported Twilio action: ${input.action}`,
    };
  }

  const accountSid = String(payload.account_sid || "");
  const authToken = input.api_key;
  const from = String(payload.from || "");
  const to = String(payload.to || "");

  if (!accountSid || !authToken || !from || !to) {
    return {
      ok: false,
      status: "failed",
      output: null,
      error: "Twilio requires account_sid, api_key/auth_token, from, and to.",
    };
  }

  const endpoint =
    input.action === "make_call"
      ? `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`
      : `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const body = new URLSearchParams();
  body.append("From", from);
  body.append("To", to);

  if (input.action === "make_call") {
    body.append("Url", String(payload.twiml_url || payload.url || ""));
  } else {
    body.append("Body", String(payload.message || payload.body || ""));
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const text = await res.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  return {
    ok: res.ok,
    status: res.ok ? "completed" : "failed",
    output: data,
    error: res.ok ? null : `HTTP ${res.status}`,
  };
}
