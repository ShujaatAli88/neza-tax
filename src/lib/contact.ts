import { BUSINESS } from "@/config/business";

export const telHref = (raw: string = BUSINESS.phoneTel) => `tel:${raw}`;
export const smsHref = (raw: string = BUSINESS.phoneTel) => `sms:${raw}`;
export const mailtoHref = (address: string = BUSINESS.email) => `mailto:${address}`;

export function directionsHref() {
  const query = encodeURIComponent(
    `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
