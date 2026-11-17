import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Cliente (Navegador) -> (Servidor) Middleware (Request, Response)
// -> NestJs (Guards, Inteceptors, Pipes, Filters)

export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    ('OutroMiddleware: Olá');
    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Marcio',
        sobrenome: 'Navarro',
      };
    }

    /*if (authorization) {
      throw new BadRequestException('Bla bla');
    }*/

    res.setHeader('Cabecalho', 'Do Middleware Outro');

    // Terminado a cadeia de chamadas
    /*return res.status(404).send({
      message: 'Não encontrado',
    });*/

    next();

    ('OutroMiddleware: Tchau!!');
  }
}
