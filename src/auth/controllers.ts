import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { authService } from '../core';

export async function login(req: Request, res: Response) {
  const requestedUsername = req.body.username;
  const requestedPassword = req.body.password;

  if (
    !requestedUsername ||
    !requestedPassword
  ) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: ReasonPhrases.UNAUTHORIZED
      });
  }

  const user = await authService.getUserByUsrAndPwd(requestedUsername, requestedPassword);

  switch (user) {
    case 'NOT_FOUND':
    case 'INVALID_PASSWORD':
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ReasonPhrases.UNAUTHORIZED });
    case 'UNKNOWN_ERROR':
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }

  const token = authService.generateAccessToken(user);

  return res
    .status(StatusCodes.OK)
    .json({
      access_token: token
    });
}
