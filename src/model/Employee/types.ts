export type Table = string;
export type Id = string;
export type Username = string;
export type Password = string;
export type Email = string;

type Status = 'Active' | 'Inactive';

export interface Payload {
    id: string;
    company_id: string;
    employee_first_name: string;
    employee_middle_name: string;
    employee_last_name: string;
    employee_email_address : string;
    employee_password: string;
    employee_address: string;
    employee_position: string;
    employee_contact_number: number;
    employee_status: Status;
    employee_image: any;
    created_at: Date;
    updated_at: Date;
}
