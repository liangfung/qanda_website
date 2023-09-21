import { NETWORK_TIMEOUT, RESPONSE_ERROR_CODE } from '@/constant'
import { IResponse } from '@/types/response'

export const responseErrorHandler = async (
  response: any,
): Promise<IResponse> => {
  try {
    // logic error
    if (response instanceof Response) {
      if (response.status === 401) {
        return {
          success: false,
          errorCode: RESPONSE_ERROR_CODE.UNAUTHORIZED,
          errorMessage: 'Unauthorized',
        }
      }
      if (response.status === 403) {
        return {
          success: false,
          errorCode: RESPONSE_ERROR_CODE.FORBIDDEN,
          errorMessage: 'Forbidden',
        }
      }
      if (response.status === 404) {
      }
      return {
        success: false,
        errorCode: RESPONSE_ERROR_CODE.SERVER_ERROR,
        errorMessage: response.statusText,
      }
    }

    // timeout
    if (response?.name === 'AbortError') {
      return {
        success: false,
        errorCode: RESPONSE_ERROR_CODE.TIME_OUT,
        errorMessage: 'timeout',
      }
    }
    // network error
    if (response instanceof Error) {
      return {
        success: false,
        errorCode: RESPONSE_ERROR_CODE.NETWORK_ERROR,
        errorMessage: response?.message || String(response),
      }
    }

    return {
      success: false,
      errorCode: RESPONSE_ERROR_CODE.SERVER_ERROR,
    }
  } catch (e) {
    return {
      success: false,
      errorCode: RESPONSE_ERROR_CODE.SERVER_ERROR,
    }
  }
}

export function responseSuccessHandler<T>(
  response: Response,
): Promise<IResponse<T>> {
  return response.json().then((data: T | undefined) => ({
    success: true,
    data,
  }))
}

export async function fetchWrapper<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  let timer
  try {
    const controller = new AbortController()
    timer = setTimeout(() => controller.abort(), NETWORK_TIMEOUT)
    const response = await fetch(input, {
      ...(init ?? {}),
      signal: controller.signal,
    })
    if (!response.ok) {
      return responseErrorHandler(response)
    }

    return responseSuccessHandler<T>(response)
  } catch (error) {
    return responseErrorHandler(error)
  } finally {
    clearTimeout(timer)
  }
}
