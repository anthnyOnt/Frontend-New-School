import { usuario } from "./usuario";

export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    usuario: usuario;
    
  }