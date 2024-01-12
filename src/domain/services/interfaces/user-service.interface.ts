import { Observable } from 'rxjs';
import { UserEntity } from 'src/domain';

export interface IUserService {
  findUserById(id: string): Observable<UserEntity>;
  registerUser(user: UserEntity): Observable<UserEntity>;
  update(id: string, user: Partial<UserEntity>): Observable<UserEntity>;
  delete(id: string): Observable<boolean>;
}
