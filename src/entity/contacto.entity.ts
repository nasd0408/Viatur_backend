// src/entities/Contacto.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { PrestadorDeServicio } from "./prestador.entity";

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prestadorId: number;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  creado: Date;

  @UpdateDateColumn()
  actualizado: Date;

  @DeleteDateColumn()
  eliminado: Date;

  @ManyToOne(() => PrestadorDeServicio, prestador => prestador.contactos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "prestadorId" })
  prestador: PrestadorDeServicio;
}
