import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Producto } from './producto.ts';
import { Combo } from './combo.ts';
import { Transaccion } from './transaccion.ts';
import { ProductoService } from './app.service';

@Component({
	selector:'body',
	templateUrl: './body.html',
	styleUrls: ['./app.resource_ingreso.css']
})
export class AppComponentBody  implements OnInit{ 

  
  private errorMessage: string;
  private ingProductoForm: NgForm;
  private producto: Producto;
  private productos: Producto[];	
  private modelos: Combo[];
  private transaccion: Transaccion;
  private comboselect: any;
  texto1: string = "Agregar";
  ocultarSerie: boolean = false;
  
  modelos = [ new Combo('01','Modelo 1'),new Combo('02','Modelo 2'),new Combo('03','Modelo 3')];
  mode = 'Observable';
  
  elegirAll = false;
  
  @ViewChild('ingProductoForm') currentForm: NgForm;
  
  
  constructor(private service: ProductoService){}
	
	
	resetear()
	{
		/*
		document.getElementById("idalmacenorg").value="231";
		document.getElementById("nomalmacenorg").value="ALMACEN LIMA";
		document.getElementById("codigoresponsablerecibe").value="1";
		document.getElementById("codigoresponsabledeja").value="2";
		document.getElementById("formdata").reset();
		*/
		this.producto = this.inicializar();
		this.productos = this.getProductos();
		this.topFunction();
		this.texto1 = "Agregar";
		this.ocultarSerie = false;
		
		if(document.getElementsByClassName("alert alert-danger") === null)
		{
			alert('does not exist!');
		}
		else
		{
			var divsValidacion = document.getElementsByClassName("alert alert-danger");
			for (var i = 0; i < divsValidacion.length; i++)
			{
				divsValidacion[i].parentNode.removeChild(divsValidacion[i]);
			}
			this.resetear2();
		}
		

	}
	
	resetear2()
	{
		var divsValidacion2 = document.getElementsByClassName("alert alert-danger");
		for (var i = 0; i < divsValidacion2.length; i++)
		{
			divsValidacion2[i].parentNode.removeChild(divsValidacion2[i]);
		}
	}
	
	
	
  private inicializar(){
	   return (new Producto(
    '1',null,'2',null,null,"231",null,"ALMACEN LIMA",null,'',this.modelos[0].id,null,
    null,
    0,
    0,
    0.00,
    null,
    null,
    null,
	null,
		null,null,null,false,new Transaccion('codigo','descripion')
	)); 
	
  }
  
  	ngOnInit()
	{ 
		this.producto = this.inicializar(); 
		this.productos = this.getProductos();
	}
  
  	public getProductos() {
            this.service.getProductos()
						.subscribe(productos=>{
							this.productos = productos;
							//console.log("productos: " + JSON.stringify(this.productos));
						},
						error => this.errorMessage = <any>error
						); 
	}
	
	public eliminarProducto(serie, idalmacen) {
		//console.log("eliminarProducto()="+JSON.stringify(this.producto));
		this.service.deleteProducto(serie,idalmacen)
             .subscribe( transaccion => {
				this.resetear();
				//this.getProductos(1);
				//console.log("ver datos=="+JSON.stringify(this.transaccion));
				},
            error =>  this.errorMessage = <any>error);
			this.resetear();
    }
	
	
	
	topFunction()
	{
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	
	ngAfterViewChecked() {
	this.formChanged();
	}
	
	
	
	formChanged() {
		
		if (this.currentForm === this.ingProductoForm) { return; }
		this.ingProductoForm = this.currentForm;
		if (this.ingProductoForm) {
		  this.ingProductoForm.valueChanges
			.subscribe(data => this.onValueChanged(data));
		}
	
	}
	
	onValueChanged(data?: any) {
		if (!this.ingProductoForm) { return; }
		const form = this.ingProductoForm.form;

		for (const field in this.formErrors) {
		  // clear previous error message (if any)
		  this.formErrors[field] = '';
		  const control = form.get(field);

		  if (control && control.dirty && !control.valid) {
			const messages = this.validationMessages[field];
			for (const key in control.errors) {
			  this.formErrors[field] += messages[key] + ' ';
			}
		  }
		}
	}
	
    formErrors = {
		'idalmacenorg': '',
		'nomalmacendes':'',
		'vendedor':'',
		'serie':'',
		'modelo':'',
		'nombre':'',
		'peso':'',
		'lote':'',
		'precio':'',
		'nombreresponsabledeja':'',
		'nombreresponsablerecibe':'',
		'descripcion':''
		
	};
  
	validationMessages = {
	    'idalmacenorg': {
		  'required':      'Este campo es obligatorio',
		  'minlength':     'La longitud minima es 3',
		  'maxlength':     'La longitud máxima es 10'
		},
		'nomalmacenorg': {
		  'required':      'Este campo es obligatorio',
		  'minlength':     'La longitud minima es 4',
		  'maxlength':     'La longitud máxima es 200'
		},
		'vendedor': {
		  'required':      'Este campo es obligatorio',
		  'minlength':     'La longitud minima es 6',
		  'maxlength':     'La longitud máxima es 200'
		},
		'serie':{
		  'required':      'Este campo es obligatorio',
		  'minlength':     'La longitud minima es 3',
		  'maxlength':     'La longitud máxima es 11'
		},
		'modelo':{
		  'required':      'Este campo es obligatorio'
		},
		'nombre':{
		  'required':      'Este campo es obligatorio',
		  'minlength':     'La longitud minima es 3',
		  'maxlength':     'La longitud máxima es 50'
		},
		'peso':{
		  'required':      'Este campo es obligatorio',
		  'minlength':     'Ingrese el peso del producto',
		  'maxlength':     'La longitud máxima es 8'
		},
		'lote':{
		  'required':      'Este campo es obligatorio',
		  'minlength':     'Ingrese el lote del producto',
		  'maxlength':     'La longitud máxima es 8'
		},
		'precio':{
		  'required':      'Este campo es obligatorio',
		  'minlength':     'Ingrese el precio del producto',
		  'maxlength':     'La longitud máxima es 10'
		},
		'nombreresponsabledeja':{
		  'required':      'Este campo es obligatorio',
		  'minlength':     'La longitud minima es 3',
		  'maxlength':     'La longitud máxima es 50'
		},
		'nombreresponsablerecibe':{
		  'required':      'Este campo es obligatorio',
		  'minlength':     'La longitud minima es 3',
		  'maxlength':     'La longitud máxima es 50'
		},
		'descripcion':{
		  'maxlength':     'La longitud máxima es 200'
		}
		
	};


    public addProducto(){
        this.service.addProducto(this.producto)
             .subscribe( transaccion => {
                 //transaccion.codigo==000
                console.log("ver datos=="+JSON.stringify(this.transaccion));
                },
            error =>  this.errorMessage = <any>error);
			this.resetear();
    }

	

    public updateProducto(){
        this.service.updateProducto(this.producto)
             .subscribe( transaccion => {
                 //transaccion.codigo==000
				this.resetear();
                //console.log("ver datos=="+JSON.stringify(this.transaccion));
                
                },
            error =>  this.errorMessage = <any>error);
			this.resetear();
    }
	
	

    public submit()
	{
		

		if(this.texto1 == "Agregar")
		{
            this.texto1 = "Guardando...";
			console.log('Saving Producto', this.producto);
            this.addProducto();
			this.texto1 = "Agregar";
			this.ocultarSerie = false;
			this.resetear();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			setTimeout(function(){
				document.getElementsByClassName("alert alert-danger")[0].parentNode.removeChild(document.getElementsByClassName("alert alert-danger")[0]);
			}, 500);
			setTimeout(function(){
				document.getElementsByClassName("alert alert-danger")[0].parentNode.removeChild(document.getElementsByClassName("alert alert-danger")[0]);
			}, 500);
			setTimeout(function(){
				document.getElementsByClassName("alert alert-danger")[0].parentNode.removeChild(document.getElementsByClassName("alert alert-danger")[0]);
			}, 500);
		}
		else if(this.texto1 == "Actualizar")
		{
			this.texto1 = "Actualizando...";
			console.log('Producto update',this.producto.serie);
            this.updateProducto();
			this.producto.indSave = null;
			this.texto1 = "Agregar";
			this.ocultarSerie = false;
			this.resetear();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			this.resetear2();
			setTimeout(function(){
				document.getElementsByClassName("alert alert-danger")[0].parentNode.removeChild(document.getElementsByClassName("alert alert-danger")[0]);
			}, 500);
			setTimeout(function(){
				document.getElementsByClassName("alert alert-danger")[0].parentNode.removeChild(document.getElementsByClassName("alert alert-danger")[0]);
			}, 500);
			setTimeout(function(){
				document.getElementsByClassName("alert alert-danger")[0].parentNode.removeChild(document.getElementsByClassName("alert alert-danger")[0]);
			}, 500);
		}
		else
		{
			this.resetear2();
		}

    }
	
	
	
	
	checkeartodos()
	{
		if(this.elegirAll==false){
			for (var i = 0; i < this.productos.length; i++) {
			  this.productos[i].elegido = false;
			}
		}
		else
		{
			for (var i = 0; i < this.productos.length; i++) {
			  this.productos[i].elegido = true;
			}
		}
	}
	
	

	edit(serie: any, modelo: any, nombre: any, nomalmacenorg: any, fechaRecepcion: any, descripcion: any, vendedor: any, idalmacenorg: any, peso: any, lote: any, precio: any, nombreresponsabledeja: any, nombreresponsablerecibe: any)
	{
		this.texto1 = "Actualizar";
		this.ocultarSerie = true;
		//alert(" " + this.modelos[0].valor + " " +  this.modelos[1].valor + " " +  this.modelos[2].valor  );
		//if(this.modelos.value == modelo){this.modelos.id = this.modelos[0].id;}else{ this.modelos.id = this.modelos[0].id];}
		if(this.modelos[0].id == modelo){ this.comboselect = this.modelos[0].id; }
		if(this.modelos[1].id == modelo){ this.comboselect = this.modelos[1].id; }
		if(this.modelos[2].id == modelo){ this.comboselect = this.modelos[2].id; }
		
		
		this.producto = new Producto(
		'1',
		nombreresponsablerecibe,
		'2',
		nombreresponsabledeja,
		null,
		idalmacenorg,
		null,
		nomalmacenorg,
		null,
		serie,
		this.comboselect,
		nombre,
		vendedor,
		peso,
		lote,
		precio,
		descripcion,
		null,
		null,
		0,
		null,
		null,
		null,
		false,
		new Transaccion('codigo','descripion')
		);

	}
	
  
}