import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces';
import { Observable, from } from 'rxjs';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';
import { Repository_key } from 'src/infrastructure';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(Repository_key.USER)
    private readonly userRepository: UserRepository,
  ) {}

  public findUserById(id: string): Observable<UserEntity> {
    return from(this.userRepository.getUser(id));
  }
  public registerUser(user: UserEntity): Observable<UserEntity> {
    return from(this.userRepository.createUser(user));
  }
  public update(id: string, user: Partial<UserEntity>): Observable<UserEntity> {
    return from(this.userRepository.updateUser(id, user));
  }
  public delete(id: string): Observable<boolean> {
    return from(this.userRepository.deleteUser(id));
  }
}
