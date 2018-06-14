import {Entity, property, model} from '@loopback/repository';

@model()
export class Donation extends Entity {
    
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        required: true
    })
    user_id: number;

    @property({
        type: 'number',
        required: true
    })
    charity_id: number;

    @property({
        type: 'number',
        required: true
    })
    amount: number;

    @property({
        type: 'string',
        required: true
    })
    date: string;

    getDonationId() {
        return this.id;
    }

}
    