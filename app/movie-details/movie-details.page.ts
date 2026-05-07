import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon]
})
export class MovieDetailsPage implements OnInit {

  movie_id:string = "";
  api_key: string = "2bef00b6e8260141111bda3da66d2688";
  movie:any;
  movieCredits:any;
  
  constructor(
    private mhs:MoviesService,
    private ds:Data,
    private router: Router
  ) {
    addIcons({ heart, home });  // for icons
  }

  ngOnInit() {
    this.getMovieId();
  }

  // gets id value from storage and assigns as movie_id
  async getMovieId() {
    this.movie_id = await this.ds.get('id');
    this.getMovie();
    this.getMovieCredits();
  }

  // gets movie data from API
  async getMovie() {
    const movieOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/" + this.movie_id + "?api_key=" + this.api_key
    }
    const result = await this.mhs.get(movieOptions);
    this.movie = result.data
  }

  // gets movie credits from API (different object to the movie itself with different URL)
  async getMovieCredits() {
    const movieCreditsOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/" + this.movie_id + "/credits?api_key=" + this.api_key
    }
    const result = await this.mhs.get(movieCreditsOptions);
    this.movieCredits = result.data
  }

  // sends person's id to storage and opens details page
  async openDetails(person_id: number) {
    await this.ds.set("id", person_id);
    this.router.navigate(['/details']);
  }

  openFavourites() {
    this.router.navigate(['/favourites']);
  }

  openHome() {
    this.router.navigate(['/home']);
  }

  async addToFavourites(movie_id:string) {
    let favourites = await this.ds.get("favourites");
    if (!favourites) {
      favourites = [];
    }
    favourites.push(movie_id);
    await this.ds.set("favourites", favourites)
  }

}
