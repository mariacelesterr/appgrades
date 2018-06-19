import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userdata: any;

	constructor(private userService: UserService, private router: Router) {
	}

	ngOnInit() {
		this.router.events.filter(event => event instanceof NavigationEnd)
			.subscribe(event => {
					this.userService.getProfile().subscribe(data => {
						if (data) {
							this.userdata = this.userService.getUserData();
						} else {
							this.userService.flush();
							this.userdata = null;
						}
					});
				}
			);
	}
}
