import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class XmlParserService {
  private makes = [];

  constructor(private readonly httpService: HttpService) {}

  async fetchAndTransformData(): Promise<any[]> {
    if (this.makes.length > 0) {
      return this.makes;
    }

    const makesXml = await this.fetchXml(
      'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML',
    );
    const makesJson = await parseStringPromise(makesXml);
    const makes = makesJson.Response.Results[0].AllVehicleMakes.slice(20);

    const transformedMakes = [];
    let index = 0;
    for (const make of makes) {
      index ++;
      if(index === 10) break;
      const makeId = make.Make_ID[0];
      const makeName = make.Make_Name[0];

      const vehicleTypesXml = await this.fetchXml(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`,
      );
      const vehicleTypesJson = await parseStringPromise(vehicleTypesXml);
      const vehicleTypes =
        vehicleTypesJson.Response.Results[0].VehicleTypesForMakeIds || [];

      const transformedVehicleTypes = vehicleTypes.map((vt) => ({
        typeId: vt.VehicleTypeId[0],
        typeName: vt.VehicleTypeName[0],
      }));

      if (transformedVehicleTypes.length > 0) {
        transformedMakes.push({
          makeId: makeId,
          makeName: makeName,
          vehicleTypes: transformedVehicleTypes,
        });
      }
    }

    this.makes = transformedMakes;
    return this.makes;
  }

  private async fetchXml(url: string): Promise<string> {
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  getMakes() {
    return this.makes;
  }

  getMakeById(id: number) {
    return this.makes.find((make) => make.makeId === id);
  }
}
