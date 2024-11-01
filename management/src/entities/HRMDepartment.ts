export class HRMDepartment{
    constructor(
        public readonly tenant_id:number,
        public readonly name: string,
        public readonly handle?: string,
        public readonly description?: string,
        public readonly parent_id?: number
    ){
        this.parent_id = tenant_id;
        this.name = name;
        this.handle = handle;
        this.description = description;
        this.parent_id = parent_id;
    }
}