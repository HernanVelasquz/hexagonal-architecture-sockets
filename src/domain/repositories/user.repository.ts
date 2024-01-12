import { Observable } from 'rxjs';
import { UserEntity } from '../entities';

export interface UserRepository {
  getUser(id: string): Observable<UserEntity | undefined>;
  createUser(user: UserEntity): Observable<UserEntity>;
  updateUser(id: string, user: Partial<UserEntity>): Observable<UserEntity>;
  deleteUser(id: string): Observable<boolean>;
}
