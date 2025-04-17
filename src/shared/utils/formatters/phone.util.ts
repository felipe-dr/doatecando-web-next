export function formatPhone(phone: string): string {
  const sanitizedPhone = phone.replace(/\D/g, '');

  if (sanitizedPhone.length === 10) {
    return sanitizedPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  if (sanitizedPhone.length === 11) {
    return sanitizedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return phone;
}
