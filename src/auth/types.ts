import { User } from "../shared/entities";

export type GetUserByUsrAndPwdResponse = User | 'NOT_FOUND' | 'INVALID_PASSWORD' | 'UNKNOWN_ERROR';
