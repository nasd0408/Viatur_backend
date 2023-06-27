import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity("recuperaciones")
export class Recuperacion {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    token: string

    @Column({ unique: true, nullable: true })
    email: string

    @CreateDateColumn()
    creado: Date
}