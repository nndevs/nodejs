var slugify = require('slugify')
import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "../database/connection";

interface HRMDesignationAttributes {
  id?: number,
  tenant_id: number,
  name: string,
  department_id: number,
  handle?: string,
  description?: string
}

export interface HRMDesignationInput extends Optional<HRMDesignationAttributes, 'id'>{ }
export interface HRMDesignationOutput extends Required<HRMDesignationAttributes>{ }

class HRMDesignation extends Model<HRMDesignationAttributes, HRMDesignationInput> implements HRMDesignationAttributes {
  public tenant_id!: number;
  public name!: string;
  public department_id!: number;
  public handle?: string;
  public description?: string;
}

HRMDesignation.init({
  tenant_id: DataTypes.BIGINT,
  name: DataTypes.STRING,
  handle: DataTypes.STRING,
  department_id: DataTypes.BIGINT,
  description: DataTypes.TEXT
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  underscored: false
});

HRMDesignation.beforeValidate((hrmdesignation) => {
  if (hrmdesignation.name) {
    hrmdesignation.handle = slugify(hrmdesignation.name, { lower: true });
  }
});

HRMDesignation.beforeCreate(async (hrmdesignation) => {
	let baseSlug = hrmdesignation.handle;
	let counter = 1;

	//Check for existing handle and increment if needed
	while (await HRMDesignation.findOne({ where: { tenant_id: hrmdesignation.tenant_id, handle: hrmdesignation.handle } })) {
		hrmdesignation.handle = `${baseSlug}-${counter}`;
		counter++;
	}
});

export default HRMDesignation;