import { Timestamp } from 'firebase/firestore';

export interface Costs {
    category: string;
    price: number;
    user_id: string;
    id: string;
    date: Timestamp;
}
