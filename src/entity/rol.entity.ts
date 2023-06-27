import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { Usuario } from "./usuario.entity"
import { Permiso } from "./permiso.entity"

@Entity("roles")
export class Rol {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    nombre: string

    @Column()
    descripcion: string
    
    @CreateDateColumn()
    creado: Date

    @UpdateDateColumn()
    actualizado: Date

    @DeleteDateColumn()
    eliminado: Date

    @ManyToMany(() => Permiso, (permiso) => permiso.roles)
    @JoinTable({ name: "RolesPermisos" })
    permisos: Permiso[]

    @OneToMany(() => Usuario, (usuario) => usuario.rol)
    usuarios: Usuario[]
}