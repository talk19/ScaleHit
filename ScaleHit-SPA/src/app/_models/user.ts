import { Scale } from './scale';

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    editorType: string;
    status: string;
    phone: string;
    country: string;
    registerTime: Date;
    lastEnter: Date;
    planStarted: Date;
    planExpired: Date;
    scalesCount: number;
    organization?: string;
    scales?: Scale[];
}
