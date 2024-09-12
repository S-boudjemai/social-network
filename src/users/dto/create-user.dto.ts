import {
  IsString,
  IsEmail,
  IsOptional,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  role: 'franchisee' | 'franchisor'; // Utilisation du type union pour le rôle

  @ValidateIf((o) => o.role === 'franchisor' || o.role === 'franchisee')
  @IsString()
  @IsNotEmpty({
    message: 'Group name is required for franchisors or franchisees',
  })
  groupName?: string;
}
