import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

import {MaterializeDirective} from "angular2-materialize";
import 'rxjs/add/operator/filter';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userdata: any;
  error: any;
  

	constructor(private userService: UserService, 
		private router: Router, 
		private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.router.events.filter(event => event instanceof NavigationEnd)
			.subscribe(event => {
				this.userService.getProfile().subscribe(
					data => {
						if (data) {
							this.userdata = this.userService.getUserData();
						} else {
							this.userService.flush();
							this.userdata = null;
						}
					},
					error=>{
						this.error = error;
						if(this.router.routerState.snapshot.url != '/login' && this.router.routerState.snapshot.url != '/signup'){
							swal({
								title: '¡Error!',
								text: this.error.message,
								type: 'error',
								confirmButtonText: 'Aceptar'
							})
						}
					});
				}
			);
	}
}
