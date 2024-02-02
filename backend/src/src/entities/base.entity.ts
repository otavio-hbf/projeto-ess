import crypto from 'crypto'

export default class BaseEntity {
  id: string;

  constructor(id: string) {
    this.id = id || crypto.randomUUID();
  }
}
