import { Transaccion } from './transaccion';

export class Producto {
	
  constructor(
	public codigoresponsablerecibe: string,
    public nombreresponsablerecibe: string,
    public codigoresponsabledeja: string,
    public nombreresponsabledeja: string,
    public comentario: string,
    public idalmacenorg: string,
    public idalmacendes: string,
    public nomalmacenorg: string,
    public nomalmacendes: string,
    public serie: string,
    public modelo: string,
    public nombre: string,
    public vendedor: string,
    public peso: number,
    public lote: number,
    public precio: number,
    public descripcion: string,
    public codrespalmacenero: string,
    public nombrespalmacenero: string,
	public indSave: number, /*null es save 0 es update*/
	public fechaRecepcion: string,
    public codEstado: string,
    public desEstado: string,
	public elegido:boolean,
	public transaccion: Transaccion
	) { }	
}