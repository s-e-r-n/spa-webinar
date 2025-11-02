export async function sendJSON(url, payload) {
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    try {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return Promise.resolve(true);
    } catch {}
  }

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  })
    .then(() => true)
    .catch(() => false);
}

export function trackPageView(enrich = {}) {
  const href = typeof window !== "undefined" ? window.location.href : undefined;
  const fbp = document.cookie
    .split("; ")
    .find((c) => c.startsWith("_fbp="))
    ?.split("=")[1];
  const fbc = document.cookie
    .split("; ")
    .find((c) => c.startsWith("_fbc="))
    ?.split("=")[1];

  const payload = {
    eventName: "ViewContent",
    event_source_url: href,
    fbp,
    fbc,
    customData: {},
    ...enrich,
  };

  return sendJSON("/api/umai", payload);
}
