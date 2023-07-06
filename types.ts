export interface RESPONSE {
    code: number
    message: string
    data?: any
    error?: any
}
export interface USER {
    username: string
    email: string
    password: string
}
export interface DB_USER {
    username: string
    email: string
    password: string,
    _id: string,
    __v: number
}