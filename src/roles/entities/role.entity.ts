import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "role_name" })
    roleName: string;

    @Column({ type: "varchar" })
    description: string;

    @ManyToMany(() => User, user => user.roles, { cascade: true })
    users: User[];
}
