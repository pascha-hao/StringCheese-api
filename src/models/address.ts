import {Entity, property, model} from '@loopback/repository';

@model()
export class Address extends Entity {
    
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        id: true
    })
    user_id?: number;

    @property({
        type:'string'
    })
    addressLine: string;

    @property({
        type:'string'
    })
    country: string;

    @property({
        type:'string'
    })
    state: string;

    @property({
        type:'string'
    })
    zipCode: string;

    @property({
        type:'string'
    })
    phoneNum: string;

    getAddressId() {
        return this.id;
    }
}
