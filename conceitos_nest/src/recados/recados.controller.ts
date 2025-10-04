import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

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
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() pagination: any) {
        const {limit=10, offset=10} = pagination
        console.log(pagination)
        return `Retorna todos os recado. Limit=${limit}, Offset=${offset}`
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Essa rota retorna o recado ID ${id}`
    }

    @Post()
    create(@Body() body: any) {
        console.log(body);
        return body
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return{
            id,
            ...body
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `Essa rota remove o recado ID ${id}`
    }
}
