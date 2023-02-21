import { DataSource } from 'typeorm';
import { User } from '../shared/entities/user';

export class UserService {
  constructor(
    private readonly pgDatasource: DataSource
  ) { }

  async getUserById(id: number): Promise<User | null | 'UNKNOWN_ERROR'> {
    try {
      const user = await this.pgDatasource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .andWhere('user.deleted_at IS NULL')
        .getOne();
    
      return user;
    } catch (err) {
      console.error(err);

      return 'UNKNOWN_ERROR';
    }
  }
}