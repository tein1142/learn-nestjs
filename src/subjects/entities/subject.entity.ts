import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("subjects")
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, name: "subject_name"})
    subjectName: string;

    @ManyToMany(() => User, user => user.subjects, { cascade: true })
    users: User[];
}
