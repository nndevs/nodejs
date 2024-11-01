export class HRMDesignation {
    constructor(
        public readonly tenant_id: number,
        public readonly name: string,
        public readonly department_id: number,
        public readonly handle?: string,
        public readonly description?: string
    ){
        this.tenant_id = tenant_id;
        this.name = name;
        this.department_id = department_id;
        this.handle = handle;
        this.description = description;
    }
}