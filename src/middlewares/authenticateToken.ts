import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/*

    TODO: Need to fix the following function for authenticating tokens
      - Pass as middleware to requests requiring auth

*/

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // gather jwt access token from req header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        auth: false,
        message: 'Token not verified',
      });
    }

    // TODO: 'user' should be property of req object when passed as express middleware, figure out why this is incorrect
    // user = req.user;

    // pass the execution off to whatever req the client intended
    next();
  });
};
