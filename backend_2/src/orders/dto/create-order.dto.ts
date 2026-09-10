import { IsEmail, IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  customerEmail: string;

  @IsString()
  @MinLength(2)
  productName: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
