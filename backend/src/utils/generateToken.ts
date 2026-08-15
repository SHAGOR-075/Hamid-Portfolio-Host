import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'shagor_portfolio_jwt_secret_key_2026_super_secure';
  const expiresIn = process.env.JWT_EXPIRE || '30d';
  
  return jwt.sign({ id }, secret, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
};
