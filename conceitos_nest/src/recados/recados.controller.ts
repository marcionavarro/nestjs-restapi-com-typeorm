import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

interface Pagination {
  limit: number;
  offset: number;
}

interface Recado {
  recado: string;
}

// CRUD
// Create -> POST -> criar um recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um recado
// Update -> PATCH / GET -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO -> Data Transfer Object -> Objeto de transferência de dados.
// DTO -> Objeto simples -> Validar dados / Transformar dados

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosServices: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() pagination: Pagination) {
    const { limit = 10, offset = 10 } = pagination;
    // return `Retorna todos os recado. Limit=${limit}, Offset=${offset}`;
    const recados = await this.recadosServices.findAll();
    return recados;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recadosServices.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosServices.create(createRecadoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.recadosServices.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.recadosServices.remove(id);
  }
}
