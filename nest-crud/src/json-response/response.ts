import { HttpStatus } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';

export interface JSONResponse {
  status: 'success' | 'fail' | 'error';
  code: number;
  message?: string;
  data?: any;
  payload?: any;
}

export class APIResponse {
  public static success(
    code: number,
    options?: { data?: any; message?: string },
  ): JSONResponse {
    return {
      code,
      status: 'success',
      data: options?.data,
      message: options?.message,
    };
  }

  public static error(
    code: number,
    options?: { message?: string; payload?: any },
  ): JSONResponse {
    return {
      code,
      status: 'error',
      message: options?.message,
      payload: options?.payload,
    };
  }
}
