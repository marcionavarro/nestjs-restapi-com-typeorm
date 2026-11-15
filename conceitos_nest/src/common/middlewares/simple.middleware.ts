import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Cliente (Navegador) -> (Servidor) Middleware (Request, Response)
// -> NestJs (Guards, Inteceptors, Pipes, Filters)

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Olá');
    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Marcio',
        sobrenome: 'Navarro',
      };
    }

    res.setHeader('Cabecalho', 'Do Middleware');

    // Terminado a cadeia de chamadas
    /*return res.status(404).send({
      message: 'Não encontrado',
    });*/

    next(); // Proximo middleware

    console.log('SimpleMiddleware: Tchau!!');

    res.on('finish', () => console.log('SimpleMiddleware: Terminou'));
  }
}
