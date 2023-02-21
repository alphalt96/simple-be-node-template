import { DataSource, IsNull } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../shared/entities/user';
import { GetUserByUsrAndPwdResponse } from './types';
import { ACCESS_TOKEN_EXPIRE_SET, GENERATE_ACCESS_TOKEN_KEY } from '../shared/constants';

export class AuthService {
  constructor(
    private readonly pgDatasource: DataSource
  ) { }

  async getUserByUsrAndPwd(username: string, password: string): Promise<GetUserByUsrAndPwdResponse> {
    try {
      const user = await this.pgDatasource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .andWhere('user.deleted_at IS NULL')
        .getOne();

      if (!user) {
        return 'NOT_FOUND';
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return 'INVALID_PASSWORD';
      }

      return user;
    } catch (err) {
      console.error(err);

      return 'UNKNOWN_ERROR';
    }
  }

  generateAccessToken(user: User): string | 'UNKNOW_ERROR' {
    try {
      const issuedAt = Math.round(new Date().getTime() / 1000);
      const expiredAt = issuedAt + ACCESS_TOKEN_EXPIRE_SET;

      const payload = {
        id: user.id,
        iat: Math.round(new Date().getDate() / 1000),
        exp: expiredAt
      };

      const token = jwt.sign(payload, GENERATE_ACCESS_TOKEN_KEY);

      return token;
    } catch(err) {
      console.error(err);

      return 'UNKNOWN_ERROR';
    }
  }
}
