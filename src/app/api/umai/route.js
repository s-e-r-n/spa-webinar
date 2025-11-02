// app/api/meta/route.js (exemple)

import { NextResponse } from "next/server";
import { mapToMetaPayload } from "@/lib/META/meta.payload";

export async function POST(request) {
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const PIXEL_ID = process.env.META_PIXEL_ID;
  const TEST_CODE = "TEST40960";
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    return NextResponse.json({ error: "Missing META config" }, { status: 500 });
  }

  const META_ENDPOINT = `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  const extractHeaders = (req) => {
    const fwd = req.headers.get("x-forwarded-for") || "";
    const client_ip_address = fwd.split(",")[0].trim() || undefined;
    const client_user_agent = req.headers.get("user-agent") || undefined;
    return { client_ip_address, client_user_agent };
  };

  const data = await request.json();
  const headersData = extractHeaders(request);
  const eventName = data.eventName || "CompleteRegistration";

  const metaPayload = mapToMetaPayload({ ...data, eventName }, headersData, {
    eventName,
    customData: {},
    testEventCode: TEST_CODE,
  });

  console.log("[META PAYLOAD]:\n", JSON.stringify(metaPayload, null, 2));

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);

    const response = await fetch(META_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metaPayload),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const metaResponse = await response.json();

    if (!response.ok) {
      console.warn("[META ERROR]", response.status, metaResponse);
      return NextResponse.json(
        { ok: false, metaPayload, metaResponse },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json(
      { ok: true, metaPayload, metaResponse },
      { status: 200 }
    );
  } catch (e) {
    console.warn("[ENDPOINT] Error:", String(e));
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 503 }
    );
  }
}
