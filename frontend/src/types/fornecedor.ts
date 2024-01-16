export type Fornecedor = {
    dscCategoria: string;
    dscContato01: string;
    dscContato02:number;
    dscContato03:number;
    dscDataSolicitacao: string;
    dscEmail: string;
    dscFornecedor: string;
    dscPathCidade: string;
    dscRetorno01: string;
    dscRetorno02: string;
    dsctentativa01: string;
    id: number;
    
    
}     

export type FornecedorPage = {
    content?: Fornecedor[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size?: number;
    number: number;
    
    first:  boolean;
    numberOfElements?: number;
    empty?:  boolean;
}

    


