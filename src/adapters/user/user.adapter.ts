import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';

import { UserEntity, UserRepository } from '../../domain';
import { UserData } from './user.data';

@Injectable()
export class UserAdapter implements UserRepository {
  constructor(
    @InjectRepository(UserData)
    private readonly userRepository: Repository<UserData>,
  ) {}

  public getUser(id: string): Observable<UserEntity> {
    return from(this.userRepository.findOneBy({ id })).pipe(
      catchError(() =>
        throwError(() => new NotFoundException(`User not found`)),
      ),
    );
  }

  public createUser(user: UserEntity): Observable<UserEntity> {
    return from(this.userRepository.save(user)).pipe(
      catchError(() =>
        throwError(
          () => new InternalServerErrorException(`Error to register User`),
        ),
      ),
    );
  }

  public updateUser(
    id: string,
    user: Partial<UserEntity>,
  ): Observable<UserEntity> {
    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => this.getUser(id)),
      catchError(() =>
        throwError(
          () => new InternalServerErrorException(`Error to update user`),
        ),
      ),
    );
  }

  public deleteUser(id: string): Observable<boolean> {
    return from(this.userRepository.delete(id)).pipe(
      map((result) => result.affected > 0),
      catchError(() =>
        throwError(
          () => new InternalServerErrorException(`Error to delete user`),
        ),
      ),
    );
  }
}
