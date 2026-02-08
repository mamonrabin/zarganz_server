import otpGenerator from 'otp-generator';

const pad = (num: number) => num.toString().padStart(2, '0');

const orderIdGenerate = (prefix = 'ORD-') => {
    // ORD-2602084831
  const now = new Date();

  const year = now.getFullYear().toString().slice(-2);
  const month = pad(now.getMonth() + 1); // FIX: month starts from 0
  const day = pad(now.getDate());

  const randomNumber = otpGenerator.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return `${prefix}${year}${month}${day}${randomNumber}`;
};

export default orderIdGenerate;
