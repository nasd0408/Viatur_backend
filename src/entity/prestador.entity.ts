// src/entities/PrestadorDeServicio.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Contacto } from "./contacto.entity";

@Entity()
export class PrestadorDeServicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  nombre: string;

  @Column({ length: 128 })
  direccion: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 20 })
  estado: string;

  @OneToMany(() => Contacto, contacto => contacto.prestador, { cascade: true })
  contactos: Contacto[]
  
  @CreateDateColumn()
  creado: Date

  @UpdateDateColumn()
  actualizado: Date

  @DeleteDateColumn()
  eliminado: Date
}
