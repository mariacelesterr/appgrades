import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  	id: number = 0;
	username: string = '';
	password: string = '';

	constructor(private userService: UserService) {
	}

	ngOnInit() {
		this.userService.getProfile()
			.subscribe(data => {
				this.id = data.id;
				this.username = data.username;
				this.password = data.password;
			});
	}

}
