export type Table = string;
export type Id = string;
export type Role_Id = number;
export type Username = string;
export type Password = string;
export type Email = string;

type Status = 'Active' | 'Inactive';

export interface Payload {
    id: string;
    company_id: string;
    role_id: number;
    user_first_name: string;
    user_middle_name: string;
    user_last_name: string;
    user_email_address : string;
    user_password: string;
    user_address: string;
    user_position: string;
    user_contact_number: number;
    user_status: Status;
    user_image: any;
    created_at: Date;
    updated_at: Date;
}
