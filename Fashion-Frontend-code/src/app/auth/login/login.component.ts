import { HttpClient } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginInfo } from '../model-auth/login-infor';
import { AuthService } from '../service-auth/auth.service';
import { TokenStorageService } from '../service-auth/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: string;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  loginForm = new FormGroup(
    {username: new FormControl('',
        [Validators.required, Validators.minLength(4)]),
      password: new FormControl('')
  });
  constructor(
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signIn() {
    const {username, password} = this.loginForm.value;
    const authLoginInfo = new AuthLoginInfo(username, password);
    this.authService.loginAuth(authLoginInfo).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.token.saveAuthorities(data.roles);
        this.token.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getAuthorities();
        this.router.navigateByUrl(this.returnUrl);

        this.authenticateUser();
      },
        error => {
        console.log(error);
        this.isLoginFailed = true;
      }
    );
  }

  authenticateUser() {
    console.log(this.token.getToken());
    console.log(this.token.getAuthorities());
    if (this.token.getToken()) {
      // this.router.navigate(['admin','admin-product']);
      for (const role of this.token.getAuthorities()) {
        console.log(role);
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['admin', 'product']);
          return true;
        }
      }

    } else if (this.token.getToken()) {
      for (const role of this.token.getAuthorities()) {
        if (role === 'ROLE_PM') {
          return true;
        }
        this.router.navigate(['/admin']);
      }
    } else if (this.token.getToken()) {
      for (const role of this.token.getAuthorities()) {
        if (role === 'ROLE_USER') {
          return true;
        }
        this.router.navigate(['/home']);
      }
    }
  }

  reloadPage() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.reloadPage();
  }
}
