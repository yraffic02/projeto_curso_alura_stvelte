import type { IRepositorio } from "./IRepositorio"

export interface IUsuario {
    login: string
    avatar_url: string
    perfil_url: string
    nome: string
    repos_publicos: number
    seguidores: number
    repositorios_recentes: IRepositorio[];
}