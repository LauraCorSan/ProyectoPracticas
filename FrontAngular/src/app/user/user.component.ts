import { Component } from '@angular/core';
import { User } from '../user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    standalone:true
})
export class UserComponent {
    user=  new User('Jane', 'Smith', 'jane@example.com', ['Nuts'], new Date('1985-05-15')) ;
}
