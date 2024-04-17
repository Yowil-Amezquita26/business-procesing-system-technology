export interface EXPENSE  {
    ID_EMPRESA: string ;
    ID_LIST_INF: number;
    ID_TIPO_INF: string;
    ID_GRUPO: string |null;
    ID_ATRIBUTO: string;
    ORIGEN_ATRIBUTO: string;
    DESCRIPCION_ATRIBUTO: string;
    ORDEN: number;
    ESTADO: string;
    FECHA_INSERCION: string;
    USUARIO_INSERCION: string;
    FECHA_ACTUALIZACION: string | null;
    USUARIO_ACTUALIZACION: string | null;
    SUMAREN: string |null;
    TIPO_ATRIBUTO: string;
    TIPO_ENTIDAD: string;
    VALOR?: string | null;
};

export interface DATA {
    ID_ATRIBUTO: string;
    ORIGEN_ATRIBUTO: string;
    DESCRIPCION_ATRIBUTO: string;
    ESTADO: string;
    TIPO_ATRIBUTO: string;
    SUMAREN?: string | null;
    ORDEN: number;
    
  }