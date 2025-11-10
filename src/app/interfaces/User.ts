export enum TypeUser {
  ADMIN = 'ADMIN',
  PERIODISTA = 'PERIODISTA',
  COMUN = 'COMUN'
}

export enum PoliticalPosition {
  LIBERAL = 'LIBERAL',
  SOCIALISMO = 'SOCIALISMO',
  ANARQUISMO = 'ANARQUISMO',
  COMUNISMO = 'COMUNISMO',
  SOCIALDEMOCRACIA = 'SOCIALDEMOCRACIA'
}

export interface User {
  id?: number;                        // opcional, lo genera el backend
  name: string;
  email: string;
  profession: string;
  address: string;
  gender: boolean;                    // true/false
  type: TypeUser;                     // enum
  password: string;
  politicalPosition: PoliticalPosition; // enum
  state: boolean;                     // activo o no
}
export interface AuthResponse extends Partial<User>{
  token:string
}