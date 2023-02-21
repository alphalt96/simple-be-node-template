require('dotenv').config();

import { AuthService } from './auth/services';
import { PostgresConnection } from './lib/postgres'
import { StorageConnection } from './lib/storage';
import { UserService } from './users/services';

// initialize database connection
const postgresConnection = new PostgresConnection();
postgresConnection.startConnection();
export const pgDatasource = postgresConnection.getConnection();

// initialize storage connection
const storageConnection = new StorageConnection();
storageConnection.startConnection();

// initialize services
export const userService = new UserService(pgDatasource);
export const authService = new AuthService(pgDatasource);
