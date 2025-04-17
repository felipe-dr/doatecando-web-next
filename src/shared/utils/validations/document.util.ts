export function isValidCpf(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += +cpf[i] * (10 - i);
  let check1 = (sum * 10) % 11;
  if (check1 === 10 || check1 === 11) check1 = 0;
  if (check1 !== +cpf[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += +cpf[i] * (11 - i);
  let check2 = (sum * 10) % 11;
  if (check2 === 10 || check2 === 11) check2 = 0;

  return check2 === +cpf[10];
}

export function isValidCnpj(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calc = (length: number): number => {
    let sum = 0;
    let pos = length - 7;
    for (let i = 0; i < length; i++) {
      sum += +cnpj[i] * pos--;
      if (pos < 2) pos = 9;
    }

    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
  };

  const check1 = calc(12);
  const check2 = calc(13);

  return check1 === +cnpj[12] && check2 === +cnpj[13];
}

export function isValidCpfOrCnpj(document: string): boolean {
  const onlyDigits = document.replace(/\D/g, '');

  return isValidCpf(onlyDigits) || isValidCnpj(onlyDigits);
}
