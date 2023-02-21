import { Request, Response } from 'express';
import { userService } from '../core';

export async function getUser(req: Request, res: Response) {
  const data = await userService.getUserById(1);

  console.log('data', req.user);

  return res.json({
    message: 'success'
  });
}
