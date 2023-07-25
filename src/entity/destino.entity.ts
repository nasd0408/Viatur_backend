import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Destino {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 64 })
  ciudad: string;

  @Column({ length: 64 })
  municipio: string;

  @Column({ length: 64 })
  estado: string;

  @Column({ length: 200 })
  dirección: string;

  @Column({ length: 300 })
  descripción: string;

  @Column({ length: 64 })
  horario: string;

  @Column({ length: 300 })
  mejorEpoca: string;

  @Column({ length: 300 })
  historiaCultura: string;

  @Column({ length: 300 })
  gastronomía: string;

  @Column({ length: 64 })
  latitud: string;

  @Column({ length: 64 })
  longitud: string;

  @Column({ length: 20 })
  estado2: string;

  @CreateDateColumn()
  creado: Date;

  @UpdateDateColumn()
  actualizado: Date;

  @DeleteDateColumn()
  eliminado: Date;
}
