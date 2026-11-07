import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  text!: string;

  // @Column({ type: 'varchar', length: 50 })
  // Muitos recados podem ser enviados por uma unica pessoa (emissor)
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna "de" que armazena o ID da pessoa que enviou o recado
  @JoinColumn({ name: 'de' })
  de!: Pessoa;

  // @Column({ type: 'varchar', length: 50 })
  // Muitos recados podem ser enviados para uma unica pessoa (destinatário)
  @ManyToOne(() => Pessoa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // Especifica a coluna "para" que armazena o ID da pessoa que enviou o recebe o recado
  @JoinColumn({ name: 'para' })
  para!: Pessoa;

  @Column({ default: false })
  lido!: boolean;

  @Column()
  data!: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
