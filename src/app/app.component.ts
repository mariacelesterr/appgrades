import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
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
  

	constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.router.events.filter(event => event instanceof NavigationEnd)
			.subscribe(event => {
					this.userService.getProfile().subscribe(
						data => {
							if (data) {
								this.userdata = this.userService.getUserData();
								console.log(data);
							} else {
								this.userService.flush();
								this.userdata = null;
							}
						},
						error=>{
							this.error = error;
							swal({
								  title: 'Advertencia!',
								  text: this.error.message,
								  type: 'warning',
								  confirmButtonText: 'Aceptar'
								})
							this.router.navigate(['/login'])
						});
				}
			);
	}
}
