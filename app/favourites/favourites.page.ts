import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonButton, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonIcon, IonButton, IonCardTitle]
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
    this.favourites = []; // clears favourites variable and sets as empty array
    let favouritesIDs = await this.ds.get('favourites'); // stores movie id's from storage in array
    if (favouritesIDs) { // only runs if favourites have been added
      for (let id of favouritesIDs) { // loops through the movie id's added to favourites in storage
        // fetches movie with id for each favourite
        const favouriteOptions: HttpOptions = {
          url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + this.api_key
        }
        const result = await this.mhs.get(favouriteOptions);
        const movie = result.data;
        this.favourites.push(movie); // pushes the movie to the favourites array
      }
    }
  }

  // navigates to home page
  openHome() {
    this.router.navigate(['/home']);
  }

  // sends movie's id to storage and opens movie-details page
  async openMovieDetails(movie_id: number) {
    await this.ds.set("id", movie_id);
    this.router.navigate(['/movie-details']);
  }

}
