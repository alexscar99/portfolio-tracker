import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

// token authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // gather jwt access token from req header
  const authHeader = req.headers.authorization;
  // split auth header to remove 'Bearer' string and just have token
  const token = authHeader && authHeader.split(' ')[1];

  if (token !== null) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err: VerifyErrors | null, decoded: object | undefined) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Auth token is not valid',
          });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
  } else {
    return res.json({
      successs: false,
      message: 'No auth token provided',
    });
  }
};
