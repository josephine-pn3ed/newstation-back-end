export type Table = string;
export type Id = string;
export type Role_Id = number;
export type Username = string;
export type Password = string;
export type Email = string;

export type Status = 'Active' | 'Inactive';

export interface Payload {
    id: string;
    company_id: string;
    role_id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email_address : string;
    password: string;
    address: string;
    position: string;
    contact_number: number;
    status: Status;
    image: any;
    created_at: Date;
    updated_at: Date;
}
