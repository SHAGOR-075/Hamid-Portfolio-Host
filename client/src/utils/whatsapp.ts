/**
 * Normalize a phone number for WhatsApp deep links (wa.me).
 * Handles Bangladesh local numbers like 014XXXXXXXX -> 88014XXXXXXXX.
 */
export const formatWhatsAppNumber = (phone: string): string => {
  let digits = phone.replace(/\D/g, '');

  if (!digits) return '';

  // 01XXXXXXXXX -> 8801XXXXXXXXX
  if (digits.startsWith('0') && digits.length === 11) {
    digits = `88${digits}`;
  }

  // 1XXXXXXXXX (missing leading 0/country code) -> 8801XXXXXXXXX
  if (digits.length === 10 && digits.startsWith('1')) {
    digits = `880${digits}`;
  }

  return digits;
};

export const buildWhatsAppUrl = (phone: string, message?: string): string => {
  const digits = formatWhatsAppNumber(phone);
  if (!digits) return '';

  const base = `https://wa.me/${digits}`;
  if (!message?.trim()) return base;

  return `${base}?text=${encodeURIComponent(message)}`;
};
