import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Car {
    id;
    vin?;
    year?;
    brand?;
    color?;
    price?;
    saleDate?;
}


@Injectable()
export class CarService {
    constructor(private http: HttpClient) { 
    }
    
    getCarsSmall() {
        return this.http.get<any>('assets/JSON/cars-small.json')
        .toPromise()
        .then(res => <Car[]>res.data)
        .then(data => { return data; });
    }
    
    getColors() {
        return this.http.get<any>('assets/JSON/colors.json')
        .toPromise()
        .then(res => <any[]>res.data)
        .then(data => { return data; });
    }
}