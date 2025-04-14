export class Permission {
  constructor(
    public id: string,
    public name: string,
    public isReadable: boolean,
    public isWritable: boolean,
    public isDeletable: boolean,
  ) {}
}
