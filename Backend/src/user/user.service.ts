import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
	) { }

	async getUserByEmail(email: string): Promise<User> {
		return await this.userRepo.findOne({
			where: { email: email },
		})
	}

	create(createUserDto: CreateUserDto): Promise<User> {
		const newUser = this.userRepo.create(createUserDto);
		return this.userRepo.save(newUser);
	}

	async findAll() {
		return await this.userRepo.find();
	}

	async findOne(id: number) {
		return this.userRepo.findOne({ where: { id } });
	}

	async update(
		id: number,
		updateUserDto: UpdateUserDto,
	): Promise<User> {
		await this.userRepo.update(id, updateUserDto);
		return this.userRepo.findOne({ where: { id } })
	}

	async updateRFToken(
		id: number,
		refreshToken: string,
	): Promise<User> {
		await this.userRepo.update(id, { refreshToken });
		return this.userRepo.findOne({ where: { id } })
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
