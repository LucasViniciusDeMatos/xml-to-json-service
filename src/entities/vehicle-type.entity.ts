import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Make } from './make.entity';

@ObjectType()
@Entity()
export class VehicleType {
  @Field(() => Int)
  @Column()
  vehicleTypeId: number;

  @Field()
  @Column()
  vehicleTypeName: string;

  @ManyToOne(() => Make, (make) => make.vehicleTypes)
  make: Make;
}
