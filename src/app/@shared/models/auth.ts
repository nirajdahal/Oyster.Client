export interface Login {
    username: string
    password: string
    rememberMe: boolean
}

export interface LoginResponse {

    result: boolean
    token: string
    username: string
    isLockedOut: boolean
    isNotAllowed: boolean
    requiresTwoFactor: boolean

}