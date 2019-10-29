import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DummyResolveService implements Resolve<any> {

  constructor(private http: HttpClient, private loading: LoadingController) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');

    let loading: HTMLIonLoadingElement;

    this.loading.create({
      message: 'Please hold the line..'
    }).then(res => {
      loading = res;
      loading.present();
    });

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).pipe(tap(() => {
      loading.dismiss();
    }));
  }
}
