import { NotFoundException } from '@nestjs/common';

export class CardNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(
      `The element identified by ${id} is either not present or it has expired from the internal db`,
    );
  }
}
