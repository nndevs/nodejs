var slugify = require('slugify')
import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../database/connection";

interface HRMDepartmentAttributes {
	id?: number,
	tenant_id: number,
	name: string,
	handle?: string,
	description?: string,
	parent_id?: number
}

export interface HRMDepartmentInput extends Optional<HRMDepartmentAttributes, 'id'>{ }
export interface HRMDepartmentOutput extends Required<HRMDepartmentAttributes>{ }

class HRMDepartment extends Model<HRMDepartmentAttributes, HRMDepartmentInput> implements HRMDepartmentAttributes {
	public tenant_id!: number;
	public name!: string;
	public handle?: string;
	public description?: string;
	public parent_id?: number; 
}

HRMDepartment.init({
	tenant_id: DataTypes.BIGINT,
	name: DataTypes.STRING,
	handle: DataTypes.STRING,
	description: DataTypes.TEXT,
	parent_id: DataTypes.BIGINT
},{
	timestamps: true,
	sequelize: sequelizeConnection,
	underscored: false,
});

HRMDepartment.beforeValidate((hrmdepartment) => {
	if (hrmdepartment.name) {
		hrmdepartment.handle = slugify(hrmdepartment.name, { lower: true });
	}
});

HRMDepartment.beforeCreate(async (hrmdepartment) => {
	let baseSlug = hrmdepartment.handle;
	let counter = 1;

	//Check for existing handle and increment if needed
	while (await HRMDepartment.findOne({ where: { tenant_id: hrmdepartment.tenant_id, handle: hrmdepartment.handle } })) {
		hrmdepartment.handle = `${baseSlug}-${counter}`;
		counter++;
	}
});

// HRMDepartment.beforeUpdate(async (hrmdepartment) => {
//   if (hrmdepartment.changed('name')) {
//     hrmdepartment.handle = slugify(hrmdepartment.name, { lower: true });
//     let baseSlug = hrmdepartment.handle;
//     let counter = 1;

//     while (await HRMDepartment.findOne({ where: { handle: hrmdepartment.handle } })) {
//       hrmdepartment.handle = `${baseSlug}-${counter}`;
//       counter++;
//     }
//   }
// });

export default HRMDepartment;
