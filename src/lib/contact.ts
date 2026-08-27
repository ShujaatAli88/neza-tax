import { BUSINESS } from "@/config/business";

// E.164 (BUSINESS.phoneRaw) — dials correctly from international and VoIP
// clients, unlike the bare national-format number this used to default to.
export const telHref = (raw: string = BUSINESS.phoneRaw) => `tel:${raw}`;
export const smsHref = (raw: string = BUSINESS.phoneTel) => `sms:${raw}`;
export const mailtoHref = (address: string = BUSINESS.email) => `mailto:${address}`;

export function directionsHref() {
  const query = encodeURIComponent(
    `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
