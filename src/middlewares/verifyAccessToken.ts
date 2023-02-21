import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { userService } from '../core';
import { GENERATE_ACCESS_TOKEN_KEY } from '../shared/constants';

export async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  const requestedToken = req.headers['authorization'];
  const token = requestedToken?.split(' ')[1]

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: 'Invalid token'
      });
  }

  // Verify and get payload from token
  let payload = null;
  try {
    payload = jwt.verify(token, GENERATE_ACCESS_TOKEN_KEY) as JwtPayload;
  } catch (err) {
    console.log('Error at step verify token', err);

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: 'Invalid token'
      });
  }

  // Find user by id from token payload
  try {
    const user = await userService.getUserById(payload.id);

    if (user === 'UNKNOWN_ERROR') {
      throw new Error(user);
    }

    req.user = user;
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: 'Invalid token'
      });
  }

  return next();
}
