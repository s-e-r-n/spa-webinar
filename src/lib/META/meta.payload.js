import { sha256 } from "../helpers/hash";
import {
  normalizeName,
  normalizePhone,
  normalizeEmail,
  normalizeCountry,
} from "./meta.normalizers";

export function mapToMetaPayload(cleanPayload, headersData = {}, options = {}) {
  const event_time = Math.floor(Date.now() / 1000);

  const creationTimeMs = Date.now();
  const fbcFromFbclid =
    !cleanPayload.fbc && cleanPayload.fbclid
      ? `fb.1.${creationTimeMs}.${cleanPayload.fbclid}`
      : undefined;

  const user_data = {
    ...(cleanPayload.email && {
      em: [sha256(normalizeEmail(cleanPayload.email))],
    }),
    ...(cleanPayload.phoneNumber && {
      ph: [sha256(normalizePhone(cleanPayload.phoneNumber))],
    }),
    ...(cleanPayload.firstName && {
      fn: [sha256(normalizeName(cleanPayload.firstName))],
    }),
    ...(cleanPayload.lastName && {
      ln: [sha256(normalizeName(cleanPayload.lastName))],
    }),
    ...(cleanPayload.zip && { zp: [sha256(cleanPayload.zip)] }),
    ...(cleanPayload.country && {
      country: [sha256(normalizeCountry(cleanPayload.country))],
    }),
    ...(headersData.client_ip_address && {
      client_ip_address: headersData.client_ip_address,
    }),
    ...(headersData.client_user_agent && {
      client_user_agent: headersData.client_user_agent,
    }),
    ...(cleanPayload.fbp && { fbp: cleanPayload.fbp }),
    ...(cleanPayload.fbc && { fbc: cleanPayload.fbc }),
    ...(fbcFromFbclid && { fbc: fbcFromFbclid }),
  };

  const eventName = options.eventName || cleanPayload.eventName;
  const action_source = options.actionSource || "website";
  const event_source_url =
    options.eventSourceUrl || cleanPayload.event_source_url || undefined;

  const metaPayloadData = {
    event_name: eventName,
    event_time,
    action_source,
    ...(event_source_url ? { event_source_url } : {}),
    user_data,
    // custom_data: { ...(cleanPayload.customData || {}), ...(options.customData || {}) },
  };

  const metaPayload = {
    data: [metaPayloadData],
    test_event_code: "TEST40960",
  };

  return metaPayload;
}
