import { DataSource } from 'typeorm';
import path from 'path';

export class PostgresConnection {
  connection: DataSource | null = null;
  entities: []
  
  dbHost = process.env.DB_HOST;
  dbName = process.env.DB_NAME;
  dbUsername = process.env.DB_USERNAME;
  dbPassword = process.env.DB_PASSWORD;
  dbPort = +process.env.DB_PORT;

  startConnection(): void {
    this.connection = new DataSource({
      type: 'postgres',
      host: this.dbHost,
      port: this.dbPort,
      database: this.dbName,
      username: this.dbUsername,
      password: this.dbPassword,
      synchronize: false,
      logging: true,
      entities: [path.join(__dirname, '../../shared/entities/*.{js,ts}')],
      migrations: [path.join(__dirname, './migrations/*.{js,ts}')]
    })

    this.connection.initialize().then(() => {
      console.log('Database connection established!');
    }).catch((err) => {
      console.log('Database connection error', err);
    });
  }

  getConnection(): DataSource | null {
    return this.connection || null;
  }

  endConnection(): void {
    this.connection?.destroy();
  }
}
