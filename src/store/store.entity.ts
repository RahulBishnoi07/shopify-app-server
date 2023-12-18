import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    Table,
    UpdatedAt,
    DataType,
    PrimaryKey,
    Default,
  } from "sequelize-typescript";
  
  @Table({ underscored: true, tableName: "store" })
  export class Store extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, allowNull: false })
    id: string;
  
    @Column({ allowNull: false, field: "store_name" })
    storeName: string;
  
    @Column({ allowNull: false })
    email: string;
  
    @Column({ allowNull: false, field: "access_token" })
    accessToken: string;
  
    @Column({ allowNull: false, defaultValue: false, field: "is_app_install" })
    isAppInstall: boolean;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  
    @DeletedAt
    deletedAt: Date | null;
  }
  