import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from "sequelize-typescript";

@Table({ underscored: true })
export class ReviewRequest extends Model {
  @Column({ primaryKey: true, allowNull: false })
  id: string;

  @Column({allowNull: false })
  store_id: string;

  @Column({allowNull: false })
  name: string;

  @Column({allowNull: false })
  email: string;

  @Column({allowNull: false })
  product_id: string;

  @Column({allowNull: false, defaultValue: false })
  is_reviewed: boolean;

  @Column({allowNull: true })
  rating_star: number;

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
