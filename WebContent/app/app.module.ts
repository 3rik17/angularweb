import { NgModule } 	 from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { ProductoService } 		from './app.service';
import { AppComponent } 		from './app.component';
import { AppComponentBody }     from './app.body';
import { AppComponentMenu } 		from './app.menu';
import { AppComponentFooter } 		from './app.footer';


@NgModule({
	imports: [
			BrowserModule,
			FormsModule,
			HttpModule
			],
	declarations: [ 
			AppComponent,
			AppComponentBody,
			AppComponentMenu,
			AppComponentFooter
			],
	providers: [ProductoService],		
	bootstrap: [AppComponent]
})
export class AppModule{
	
}
