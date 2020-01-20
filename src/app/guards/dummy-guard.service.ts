import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DummyGuardService implements CanActivate {

  constructor(private alertController: AlertController, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const selected = +route.paramMap.get('id');

    const allowed = selected !== 150;

    if (allowed) {
      return true;
    }

    this.alertController.create({
      header: 'Sorry',
      subHeader: 'Guard prevent this',
      message: 'The guard says',
      buttons: ['OK']
    }).then(alert => alert.present());

    this.router.navigate(['home']);
    return false;
  }
}
