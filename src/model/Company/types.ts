export type Table = string;
export type Id = string;
export type Username = string;
export type Password = string;
export type Email = string;

type Status = 'Active' | 'Inactive';

export interface Payload {
    id: string;
    company_name: string;
    company_image: any; //any lang sa
    company_address: string;
    company_contact_number: number;
    company_email_address: string;
    company_password: string;
    company_status: Status;
    created_at: Date;
    updated_at: Date;
    password: string;
    email_address: string;
}
