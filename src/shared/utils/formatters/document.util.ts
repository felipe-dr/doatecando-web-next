export function formatDocument(document: string): string {
  const sanitizedDocument = document.replace(/\D/g, '');

  if (sanitizedDocument.length === 11) {
    return sanitizedDocument.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    );
  }

  if (sanitizedDocument.length === 14) {
    return sanitizedDocument.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  return document;
}
