import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";

@Table({ underscored: true })
export class ReviewRequest extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({allowNull: false })
  storeId: string;

  @Column({allowNull: false })
  name: string;

  @Column({allowNull: false })
  email: string;

  @Column({allowNull: false })
  productId: string;

  @Column({allowNull: false })
  productName: string;

  @Column({allowNull: false, defaultValue: false })
  isReviewed: boolean;

  @Column({allowNull: false, defaultValue: false })
  isPublished: boolean;

  @Column({allowNull: true })
  ratingStar: number;

  @Column({allowNull: true })
  ratingMessage: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column({
    allowNull: true,
  })
  @DeletedAt
  deletedAt: Date;
}
