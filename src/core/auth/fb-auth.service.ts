import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

export class User {
  uid: string;
  username: string = "";
  constructor(auth) {
    this.uid = auth.uid;
  }
};

@Injectable()
export class FbAuthService {

  produtos: AngularFireList<{}>;

  // private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;
  private currentUser2: User = null;

  authenticated$: Observable<boolean>;
  uid$: Observable<string>;

  isUser: Observable<boolean>;
  isAdmin: Observable<boolean>;

  constructor(private _afAuth: AngularFireAuth,
    private _afDB: AngularFireDatabase,
    private _router: Router) {
    // console.log(this.afAuth.authState.subscribe());

    // this.isUser = this._afAuth.authState.map(state => !!state);
    // console.log(this.isUser);
    // this.isAdmin = _afAuth.authState.switchMap(state => {
    //   return _afDB.object('/admins/${state.uid}').valueChanges()
    //   .map( data => {console.log(data); return !!data });
    // });
    // console.log(this.isAdmin);

    // this._afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.currentUser = user;
    //     this.produtos = this._afDB.list('/produtos');
    //   } else {
    //     this.currentUser = null;
    //   }
    // });

    this.authenticated$ = _afAuth.authState.map(user => !!user);
    this.uid$ = _afAuth.authState.map(user => user.uid);
    this.authenticated$.subscribe(user => {
      if (user) this._router.navigate(['/dashboard']);
    });

    //   this.isAdmin =  this._afAuth.authState.switchMap( authState => {
    //     if(!authState) {
    //         return Observable.of(false);
    //     } else {
    //         return this._afDB.object('/admin/'+authState.uid);
    //     }
    // }).map( adminObject => 
    //      (adminObject && adminObject['$value'] === true)
    // );

    // this._afAuth.authState.switchMap(auth => {
    //   if (auth) {
    //     this.currentUser2 = new User(auth)
    //     return this._afDB.object(`/users/${auth.uid}`)
    //   } else return [];
    // })
    // .subscribe(user => {
    //     this.currentUser['username'] = user.username
    // })


  }

  // getAuthState() {
  //   return this._afAuth.authState;
  // }

  // get authenticated(): boolean {
  //   return this.currentUser !== null;
  // }

  // get getUser(): any {
  //   return this.authenticated ? this.currentUser : null;
  // }


  loginWithUserAndPassword(email: string, passphrase: string) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, passphrase)
      .then((user) => {
        this.currentUser = user;
        this.updateUserData();
        console.log("Logado!");
      })
      .catch(error => console.log(error));
  }

  signOut() {
    this._afAuth.auth.signOut()
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this._router.navigate(['/']);
  }


  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Email sent to: ' + email))
      .catch((error) => console.log(error))
  }

  get currentUserDisplayName(): string {
    if (!this.currentUser) {
      return 'Guest';
    } else if (this.currentUser != null ? this.currentUser.isAnonymous : false) {
      return 'Anonymous';
    } else {
      return this.currentUser['displayName'] || 'User without a Name';
    }
  }

  emailSignUp(email: string, password: string) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.currentUser = user;
        this.updateUserData();
        console.log("Cadastrado com Sucesso!");
        
      })
      .catch(error => console.log(error));
  }

  anonymousLogin() {
    return this._afAuth.auth.signInAnonymously()
      .then((user) => {
        this.currentUser = user;
      })
      .catch(error => console.log(error));
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this._afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.currentUser = credential.user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  private updateUserData(): void {

    const path = `users/${this.currentUser.uid}`;
    const data = {
      uid: this.currentUser.uid,
      email: this.currentUser.email,
      name: this.currentUser.displayName
    }

    this._afDB.object(path).update(data)
      .catch(error => console.log(error));
  }

}
