import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Rol } from "./rol.entity"

@Entity("permisos")
export class Permiso {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    funcion: string

    @Column()
    modulo: string
    
    @ManyToMany(() => Rol, (rol) => rol.permisos)
    roles: Rol[]
}