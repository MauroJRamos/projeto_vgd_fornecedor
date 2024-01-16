export type Produto = {
    id: number;
    nomProduto: string;
    dscProduto: string;
    vlrPrecoAncora: number;
    datCadastro: string;
    vlrAnoFabricacao: string;
    codCna: string;
    qtdEstoque:number;
    vlrPrecoVenda:number;
    datAtualizacao: string;
    ativoInativo: string;
    codProduto: string;
    marcaId: number; 
    idtUsuarioCadastro: number;
    idtUsuarioAtualizacao: number
}     

export type ProdutoPage = {
    content?: Produto[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size?: number;
    number: number;
    
    first:  boolean;
    numberOfElements?: number;
    empty?:  boolean;
}

 


