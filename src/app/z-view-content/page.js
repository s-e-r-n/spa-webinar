useEffect(() => {
  const key = "meta:vc:sent";
  if (sessionStorage.getItem(key)) return;

  const url = new URL(window.location.href);
  const p = url.searchParams;

  const payload = {
    eventName: "ViewContent",
    event_source_url: url.toString(),
    fbp: document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1],
    fbc: document.cookie.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1],
    fbclid: p.get("fbclid") || undefined,
  };

  const send = async (attempt = 0) => {
    try {
      const r = await fetch("/api/umai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (!r.ok) throw new Error("bad_status_" + r.status);
      sessionStorage.setItem(key, "1");
    } catch (e) {
      if (attempt >= 25) return;
      setTimeout(() => send(attempt + 1), attempt === 0 ? 1000 : 3000);
    }
  };

  send();
}, []);
