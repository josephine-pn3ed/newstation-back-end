export type Table = string;
export type Id = string;
export type Username = string;
export type Password = string;
export type Email = string;

type Status = 'Active' | 'Inactive';

export interface Payload {
    id: string;
    name: string;
    address: string;
    contact_number: number;
    email_address: string;
    password: string;
    status: Status;
    created_at: Date;
    updated_at: Date;
}
