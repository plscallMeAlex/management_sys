export class Permission {
  constructor(
    public id: string,
    public name: string,
    public isReadable: boolean = false,
    public isWritable: boolean = false,
    public isDeletable: boolean = false,
  ) {}
}
