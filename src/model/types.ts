export type Table = string;
export type ID = string;
export type Username = string;
export type Password = string;

type Status = 'active' | 'inactive';
type Gender = 'M' | 'F';

export interface companyPayload {
    id: ID;
    company_name: string;
    company_image: any; //any lang sa
    company_address: string;
    company_contact_number: number;
    company_email: string;
    company_password: string;
    company_status: Status;
    created_at: Date;
    updated_at: Date;
}

export interface employeePayload {
    id: ID;
    company_id: ID;
    employee_first_name: string;
    employee_middle_name: string;
    employee_last_name: string;
    employee_email: string;
    employee_password: string;
    employee_address: string;
    employee_position: string;
    employee_contact_number: number;
    employee_status: Status;
    employee_image: any;
    created_at: Date;
    updated_at: Date;
}

export interface News {
    id: ID;
    company_id: ID;
    news_topic: string;
    news_body: string;
    news_image: any;
    news_status: Status;
    created_at: Date;
    updated_at: Date;
}

export interface Viewers {
    id: ID;
    news_id: ID;
    employee_ID: ID;
    date_viewed: Date;
}
