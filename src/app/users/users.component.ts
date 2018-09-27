import { NgModule,Component,OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { toast } from 'angular2-materialize';
import { UserService } from '../services/user.service'
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	username: string = '';
	email: string = '';
	password: string = '';
	remember: boolean = false
	public obj: any = {
		email:'',
	    password:''
	};

	error: any;
	signupSuccessful: boolean = false;
	user: any;

	//message: string = '';
	@ViewChild('f') form: any;

  	constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private userService: UserService,
  	) {}

  	ngOnInit() {	
  		//toast("I am the best toast there is!", 4000);
		if (this.route.snapshot.url[0].path === 'login') {
			if (this.userService.getUserData()) {
				this.router.navigate(['/login']);
			}
		}

		if (this.route.snapshot.url[0].path === 'logout') {
			this.doLogout();
		}
	  }
  	doSomething() {
  		if (this.form.valid) {
  			if (this.route.snapshot.url[0].path === 'login') {
				this.doLogin();
			} else {
				this.doSignup();
			}
	      //this.form.reset();
    	}
		
	}
	auth() {
		if (this.form.valid) {
  			if (this.route.snapshot.url[0].path === 'login') {
				this.doLogin();
			} else {
				this.doSignup();
			}
    		//toast("I am the best toast there is!");
	      	//alert("Rebice los datos e intente de nuevo");
	      	this.form.reset();
    	}
	}
	doLogin() {
		this.userService.doLogin(this.obj.email, this.obj.password, this.remember)
			.subscribe(data => {
				this.userService.setUserData(data);
				this.user = data;
				this.router.navigate(['/app-menu']);
			},
			error=>{
				this.error = error;
				if(this.error.message === "connect ENOENT /Applications/MAMP/tmp/mysql/mysql.sock")
				swal({
					  title: '¡Error!',
					  text: 'Servidor de base de datos no conectado',
					  type: 'error',
					  confirmButtonText: 'Cerrar'
					})
				else {
					swal({
					  title: 'Error',
					  text: this.error.message,
					  type: 'error',
					  confirmButtonText: 'Cerrar'
					})
				}
			});
	}

	doSignup() {
		this.userService.doSignup(this.obj.email, this.obj.password)
			.subscribe(data => {
				swal({
					  title: data.message,
					  text: " Ahora debes inciar sesión ",
					  type: 'success',
					  confirmButtonText: 'Cerrar'
					})
				
			},
			error=>{
				this.error = error;
				if(this.error.message === "connect ENOENT /Applications/MAMP/tmp/mysql/mysql.sock"){
					swal({
					  title: '¡Error!',
					  text: 'Servidor de base de datos no conectado',
					  type: 'error',
					  confirmButtonText: 'Cerrar'
					})
				}
				else{
					swal({
					  title: '¡Error!',
					  text: this.error.message,
					  type: 'error',
					  confirmButtonText: 'Cerrar'
					})
				}
			});
	}
	doLogout() {
		this.userService.doLogout()
			.subscribe(data=>{
				this.router.navigate(['/login'])
				},
				error=>{
					this.error = error;
					swal({
					  title: '¡Error!',
					  text: this.error.message,
					  type: 'error',
					  confirmButtonText: 'Cerrar'
					})
				});
	}


}


