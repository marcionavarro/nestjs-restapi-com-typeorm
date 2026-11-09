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
  UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorHandleInterceptor } from 'src/common/interceptors/error-handle.interceptor';

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
  @UseInterceptors(TimingConnectionInterceptor, ErrorHandleInterceptor)
  async findAll(@Query() paginationDto: PaginationDto) {
    console.log('RecadosController executado');
    // return `Retorna todos os recado. Limit=${limit}, Offset=${offset}`;
    const recados = await this.recadosServices.findAll(paginationDto);
    return recados;
  }

  @Get(':id')
  @UseInterceptors(AddHeaderInterceptor, ErrorHandleInterceptor)
  findOne(@Param('id') id: number) {
    return this.recadosServices.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosServices.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosServices.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    console.log(id, typeof id);
    return this.recadosServices.remove(id);
  }
}
