import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MakeType {
  @Field(() => Int)
  makeId: number;
  @Field()
  makeName: string;

  @Field(() => [VehicleType])
  vehicleTypes: VehicleType[];
}

@ObjectType()
export class VehicleType {
  @Field(() => Int)
  typeId: number;
  @Field()
  typeName: string;
}
