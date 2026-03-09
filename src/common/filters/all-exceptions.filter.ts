import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttpException
      ? this.normalizeMessage(exception.getResponse())
      : 'Internal server error';

    if (!isHttpException) {
      this.logger.error(
        `Erro não tratado capturado: ${String(message)}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private normalizeMessage(response: string | object): string | string[] {
    if (typeof response === 'string') {
      return response;
    }
    if (typeof response === 'object' && 'message' in response) {
      // class-validator retorna arrays de mensagens de validação
      if (Array.isArray(response.message)) {
        return response.message as string[];
      }
      if (typeof response.message === 'string') {
        return response.message;
      }
    }
    return JSON.stringify(response);
  }
}
