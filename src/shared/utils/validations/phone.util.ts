export function isValidMobilePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');

  return digits.length === 11 && /^(\d{2})(9\d{8})$/.test(digits);
}
