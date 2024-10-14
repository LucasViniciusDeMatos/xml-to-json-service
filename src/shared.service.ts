import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  private makes = [];

  addMake(make: { makeId: number; makeName: string }) {
    this.makes.push(make);
    return make;
  }

  getMakes() {
    return this.makes;
  }

  getMakeById(id: number) {
    return this.makes.find((make) => make.makeId === id);
  }
}
