export function formatPostalCode(postalCode: string): string {
  const sanitizedPostalCode = postalCode.replace(/\D/g, '');

  if (sanitizedPostalCode.length !== 8) {
    return postalCode;
  }

  return sanitizedPostalCode.replace(/(\d{5})(\d{3})/, '$1-$2');
}
