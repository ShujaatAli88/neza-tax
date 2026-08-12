import { BUSINESS } from "@/config/business";

export const telHref = (raw: string = BUSINESS.phoneRaw) => `tel:${raw}`;
export const smsHref = (raw: string = BUSINESS.phoneRaw) => `sms:${raw}`;
export const mailtoHref = (address: string = BUSINESS.email) => `mailto:${address}`;
