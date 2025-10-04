import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

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

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosServices: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: Pagination) {
    /* const { limit = 10, offset = 10 } = pagination;
    return `Retorna todos os recado. Limit=${limit}, Offset=${offset}`; */
    return this.recadosServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosServices.findOne(id);
  }

  @Post()
  create(@Body() body: Recado) {
    return this.recadosServices.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Recado) {
    return this.recadosServices.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadosServices.remove(id);
  }
}
