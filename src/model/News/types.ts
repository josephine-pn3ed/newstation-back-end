export type Table = string;
export type Id = string;


type Status = 'Active' | 'Inactive';

export interface Payload {
    id: string;
    company_id: string;
    company_name: string,
    user_id: string;
    first_name: string,
    middle_name: string,
    last_name: string,
    topic: string;
    body: string;
    status: Status;
    created_at: Date;
    updated_at: Date;
}

export interface INews {
    id: string;
    user_id: string;
    first_name: string,
    middle_name: string,
    last_name: string,
    topic: string;
    body: string;
    status: Status;
    updated_at: Date;
}
