import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonIcon, IonButton]
})
export class FavouritesPage implements OnInit {
  favourites:any;
  api_key: string = "2bef00b6e8260141111bda3da66d2688";

  constructor(
    private mhs:MoviesService,
    private ds:Data,
    private router: Router
  ) {
    addIcons({ home });  // for icons
  }

  // on page load
  ngOnInit() {
    this.ionViewWillEnter();
  }

  // this runs every time the page is opened, not just when first opened like ngOnInit()
  ionViewWillEnter() {
    this.getFavourites();
  }

  async getFavourites() {
    this.favourites = [];
    let favouritesIDs = await this.ds.get('favourites');
    if (favouritesIDs) {
      for (let id of favouritesIDs) {
        const favouriteOptions: HttpOptions = {
          url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + this.api_key
        }
        const result = await this.mhs.get(favouriteOptions);
        const movie = result.data;
        this.favourites.push(movie);
      }
    }
    console.log(this.favourites);
  }

  // navigates to home page
  openHome() {
    this.router.navigate(['/home']);
  }

}
