import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entitie';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoasService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado.');
  }

  async findAll() {
    const recados = await this.recadoRepository.find({
      relations: ['de', 'para'],
      order: { id: 'DESC' },
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
    });

    if (recado) return recado;
    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;

    // Encontrar a pessoa que está criando o recado
    const de = await this.pessoaService.findOne(deId);

    // Encontrar a pessoa para quem o recado está sendo enviado
    const para = await this.pessoaService.findOne(paraId);

    const novoRecado = {
      text: createRecadoDto.text,
      de,
      para,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);
    return {
      ...recado,
      de: { id: recado.de.id },
      para: { id: recado.para.id },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialRecadoDto = {
      texto: updateRecadoDto?.texto,
      lido: updateRecadoDto?.lido,
    };
    const recado = await this.recadoRepository.preload({
      id,
      ...updateRecadoDto,
    });
    if (!recado) return this.throwNotFoundError();
    await this.recadoRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });
    if (!recado) return this.throwNotFoundError();
    return this.recadoRepository.remove(recado);
  }
}
