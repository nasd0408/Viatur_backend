import {
    Entity,
    Column,
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn,
    ManyToOne,
} from "typeorm"
import { Rol } from "./rol.entity"
import { hashSync, compareSync } from "bcryptjs"

@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    nombre: string

    @Column({ unique: true, nullable: true })
    email: string

    @Column()
    contrasena: string

    @Column()
    estado: string

    @CreateDateColumn()
    creado: Date

    @UpdateDateColumn()
    actualizado: Date

    @DeleteDateColumn()
    eliminado: Date

    @ManyToOne(() => Rol, (rol) => rol.usuarios)
    rol: Rol

    //methods encrypted password 
    hashPassword() {
        this.contrasena = hashSync(this.contrasena, 8);
    }

    unencryptedPasswordValidate(unencryptedPassword: string) {
        return compareSync(unencryptedPassword, this.contrasena);
    }
}