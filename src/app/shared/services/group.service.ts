import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import '../rxjs-operators';
import 'rxjs/add/operator/mergeMap';

import {Group}   from '../classes/group'
import *as url from '../constants';


@Injectable()
export class GroupService {
    constructor(private http: Http) {
    }


    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


    public getCountRecords(): Observable<any> {
        return this.http
            .get(url.countGroupsUrl)
            .map((res: Response)=>res.json())
            .do((response) => {
                console.log(JSON.stringify(response));
            })
            .catch(this.handleError);
    }


    getRecordsRange(limit: number, offset: number): Observable<any> {
        return this.http
            .get(`${url.getRangeOfGroupUrl}/${limit}/${offset}`)
            .map((data: Response)=>data.json())
            .catch(this.handleError);
    }

    getFaculty(facultyId: any): Observable<any> {
        return this.http
            .post(url.getEntityValues, {"entity": "Faculty", "ids": facultyId})
            .map((data: Response)=>data.json())
            // .do((response) => {console.log(JSON.stringify(response));})
            .catch(this.handleError);

    }

    getSpeciality(specialityId: any): Observable<any> {
        return this.http
            .post(url.getEntityValues, {"entity": "Speciality", "ids": specialityId})
            .map((data: Response)=>data.json())
            // .do((response) => {console.log(JSON.stringify(response));})
            .catch(this.handleError);

    }


}