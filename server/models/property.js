"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.belongsTo(models.User, {
        foreignKey: "postedBy",
        as: "rPostedBy",
      });
      Property.belongsTo(models.User, { foreignKey: "owner", as: "rOwner" });
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      listingType: {
        type: DataTypes.ENUM,
        values: ["SALE", "RENTAL"],
      },
      price: DataTypes.FLOAT,
      propertyTypeId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "CANCEL", "APPROVE"],
      },
      isAvailable: DataTypes.BOOLEAN,
      images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("images");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(arrayImage) {
          return this.setDataValue("images", JSON.stringify(arrayImage));
        },
      },
      featuredImage: DataTypes.STRING,
      postedBy: DataTypes.INTEGER,
      bedRoom: DataTypes.INTEGER,
      bathRoom: DataTypes.INTEGER,
      propertySize: DataTypes.FLOAT,
      yearBuilt: DataTypes.INTEGER,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
