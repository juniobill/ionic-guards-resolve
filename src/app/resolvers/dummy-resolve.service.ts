import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyResolveService implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot) {
    // const id = route.paramMap.get('id');
    const id = route.params.id;

    const loading = await this.loadingCtrl.create({
      message: 'Please wait a moment'
    });
    await loading.present();

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).pipe(
      tap(() => {
        loading.dismiss();
      })
    ).toPromise().catch(err => {
      console.log(err);

      loading.dismiss();

      this.alertController.create({
        header: 'Invalid Resolve',
        message: 'Invalid response of pokeapi',
        buttons: ['OK']
      }).then(alert => alert.present());

      this.router.navigate(['home']);

      return of('invalid response pokeapi');
    });
  }
}
