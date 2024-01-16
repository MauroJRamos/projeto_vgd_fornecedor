export type PostBling = {
    id: number;
    status_request: string;
    payload_request: string;
    datRequest: string;
}  

export type BlingPage = {
content?: PostBling[];
last: boolean;
totalPages: number;
totalElements: number;
size?: number;
number: number;

first:  boolean;
numberOfElements?: number;
empty?:  boolean;
}