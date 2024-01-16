export type DadosAncora = {
           id: number;
           codProduto: string;
            dscProduto: string;
            dscMarcaProduto: string;
            vlrProduto: number;
            datRequest: string;
}  

export type AncoraPage = {
    content?: DadosAncora[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size?: number;
    number: number;
    
    first:  boolean;
    numberOfElements?: number;
    empty?:  boolean;
}