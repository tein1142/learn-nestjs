import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    username: string;

    @Column({ type: "varchar", nullable: false })
    @Exclude()
    password: string;

    @Column({ type: "varchar" })
    firstname: string;

    @Column({ type: "varchar" })
    lastname: string;

    @ManyToMany(() => Subject)
    @JoinTable({
        name: 'users_subjects'
    })
    subjects: Subject[]

    @ManyToMany(() => Role)
    @JoinTable({
        name: "user_roles"
    })
    roles: Role[]
}
