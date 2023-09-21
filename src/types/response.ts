export enum ResponseShowType {
  SILENT,
  WARN,
  ERROR,
  TOAST,
  NOTIFICATION,
  PAGE,
}

export interface IResponse<T = any> {
  success: boolean // if request is success
  data?: T // response data
  errorCode?: string // code for errorType
  errorMessage?: string // message display to user
  showType?: ResponseShowType // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string
}

export interface IPagination {
  hasMore: boolean
  nextScore: number
  total: number
}
