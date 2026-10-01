import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

interface RequestConHora extends Request {
    horaDeEntrada: string;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: RequestConHora, res: Response, next: NextFunction){
        const tiempoInicio = performance.now();
        
        req.horaDeEntrada = new Date().toISOString();

        res.on('finish', () => {
            const tiempoFin = performance.now();

            const tiempoTotal = (tiempoFin - tiempoInicio ).toFixed(2);
            
            console.log(`Solicitud entrante, metodo HTTP usado: ${req.method}, ` + 
                `ruta usada: ${req.url}, hora de llegada: ${req.horaDeEntrada} ` + 
                `duración: ${tiempoTotal}ms`);
        });

        next();
    }
}