import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	username: string = '';
	password: string = '';
	remember: boolean = false;

	error: boolean = false;
	signupSuccessful: boolean = false;

	message: string = '';

  	constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private userService: UserService) {}

  	ngOnInit() {
		if (this.route.snapshot.url[0].path === 'login') {
			if (this.userService.getUserData()) {
				this.router.navigate(['/login']);
			}
		}

		if (this.route.snapshot.url[0].path === 'logout') {
			this.doLogout();
		}
	  }
	auth() {
		if (this.route.snapshot.url[0].path === 'login') {
			this.doLogin();
		} else {
			this.doSignup();
		}
	}

	doLogin() {
		this.userService.doLogin(this.username, this.password, this.remember)
			.subscribe(data => {
				this.userService.setUserData(data);
				console.log(data);
				this.router.navigate(['/app-menu']);
			});
	}

	doSignup() {
		this.userService.doSignup(this.username, this.password)
			.subscribe(data => {
				this.signupSuccessful = true;
				this.router.navigate(['/app-estudiantes']);
			});
	}

	doLogout() {
		this.userService.doLogout();
		this.router.navigate(['/menu']);
	}

}


