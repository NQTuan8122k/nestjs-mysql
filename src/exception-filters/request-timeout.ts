import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  RequestTimeoutException,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(RequestTimeoutException)
export class HttpExceptionFilter
  implements ExceptionFilter<RequestTimeoutException>
{
  catch(exception: RequestTimeoutException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      type: 'Timeout',
      message: 'Request Timeout',
    });
  }
}
