import { Component } from '@angular/core';
import { FbAuthService } from '../core/auth/fb-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  constructor(private _afAuth : FbAuthService){
    this._afAuth.loginWithUserAndPassword("sam@sam.com","samuel").then(res=>console.log(res));
        this.user = this._afAuth.authenticated$;
    console.log(this.user);
  }

}
