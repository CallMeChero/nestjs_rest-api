import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private _repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this._repo.create({ email, password });

    return this._repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('User not found');
    }
    return this._repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this._repo.findOne({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (user) {
      Object.assign(user, attrs);
      return this._repo.update(id, user);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id) {
    const user = await this.findOne(id);
    if (user) {
      return this._repo.delete(id);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
