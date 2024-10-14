import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import { VehicleType } from './vehicle-type.entity';

@ObjectType()
@Entity()
export class Make {
  @Field(() => Int)
  @Column()
  makeId: number;

  @Field()
  @Column()
  makeName: string;

  @Field(() => [VehicleType])
  @OneToMany(() => VehicleType, (vehicleType) => vehicleType.make, { cascade: true })
  vehicleTypes: VehicleType[];
}
