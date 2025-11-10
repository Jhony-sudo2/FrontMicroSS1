import { PoliticalPosition, User } from './User';

export enum PublicationType {
  NOTICIAS = 'NOTICIAS',
  ARTICULOS = 'ARTICULOS',
  FOROS = 'FOROS'
}

export interface Blog {
  id?: number;                     // opcional, generado por el backend
  name: string;                    // título o nombre de la publicación
  content: string;                 // contenido principal
  state: boolean;                  // activo o no
  date: string;                    // formato ISO, ej: "2025-11-04T23:00:00"
  type: PublicationType;           // enum
  author: User;                    // relación con la entidad User
  politicalPosition?:PoliticalPosition,
  image:string
}
