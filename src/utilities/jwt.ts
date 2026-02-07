import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';

interface JwtPayloadInput {
  email: string;
  name: string;
  status: string;
  role: string;
}

export const createToken = (
  jwtPayload: JwtPayloadInput,
  secret: string,
  expiresIn: SignOptions['expiresIn'] = '10d',
): string => {
  if (
    (typeof expiresIn !== 'string' && typeof expiresIn !== 'number') ||
    (typeof expiresIn === 'string' && !expiresIn.trim())
  ) {
    throw new Error(
      '"expiresIn" must be a non-empty string or number representing a time span (e.g. "1h", "7d", 3600).',
    );
  }

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};