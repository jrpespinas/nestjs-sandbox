import { HttpStatus } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';

export interface JSONResponse {
  statusCode: number;
  message?: Array<string> | string;
  data?: any;
  payload?: any;
}

export class APIResponse {
  public static success(
    statusCode: number,
    options?: { data?: any; message?: Array<string> | string },
  ): JSONResponse {
    return {
      statusCode,
      message: options?.message,
      data: options?.data,
    };
  }

  public static error(
    statusCode: number,
    options?: { message?: Array<string> | string; payload?: any },
  ): JSONResponse {
    return {
      statusCode,
      message: options?.message,
      payload: options?.payload,
    };
  }
}
