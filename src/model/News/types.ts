export type Table = string;
export type Id = string;


type Status = 'Active' | 'Inactive';

export interface Payload {
    id: string;
    company_id: string;
    company_name: string,
    user_id: string;
    user_name: string,
    news_topic: string;
    news_body: string;
    news_status: Status;
    created_at: Date;
    updated_at: Date;
}
