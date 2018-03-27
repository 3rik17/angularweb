import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Producto } from './producto';
import { Transaccion } from './transaccion';



@Injectable()
export class ProductoService {
    private productosURL = 'http://localhost:8180/appcapa';
    public productos: Producto[] = [];
    public producto: Producto;
    private errorMessage: string;

    constructor(private http: Http) { }

    public getProductos(): Observable<Producto[]> {
        return this.http.get(this.productosURL + '/productos').map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }
	
	
    public deleteProducto(id: string, almacen: string) {
        console.log("service.deleteProducto" + id);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.productosURL + "/deleteproducto/" + id + "/" + almacen + "/", {}, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
	
    public addProducto(producto: Producto):Observable<Transaccion>{
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.productosURL + "/newproducto/", JSON.stringify(producto), options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public updateProducto(producto: Producto):Observable<Producto>{
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.productosURL + "/updateproducto/", JSON.stringify(producto), options)
            .map(this.extractData)
            .catch(this.handleError);
    }
	

    private handleError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json || '';
            const err = body.error || JSON.stringif(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }


}