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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonIcon]
})
export class MovieDetailsPage implements OnInit {

  movie_id:string = "";
  api_key: string = "2bef00b6e8260141111bda3da66d2688";
  movie:any;
  movieCredits:any;
  isFavourite:boolean = false;
  
  constructor(
    private mhs:MoviesService,
    private ds:Data,
    private router: Router
  ) {
    addIcons({ heart, home });  // for icons
  }

  // on page load
  ngOnInit() {
  }

  // this runs every time the page is opened, not just when first loaded like ngOnInit()
  ionViewWillEnter() {
    this.getMovieId();
  }

  // gets id value from storage and assigns as movie_id
  async getMovieId() {
    this.movie_id = await this.ds.get('id');
    this.getMovie();
    this.getMovieCredits();
    this.checkIfFavourite();
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

  async checkIfFavourite() {
    // fetches favourites from storage
    let favourites = await this.ds.get("favourites");
    // if it does not exist, do nothing
    if (!favourites) return;
    // assign isFavourite to whether favourites includes the movie id
    this.isFavourite = favourites.includes(this.movie_id);
  }

  async addToFavourites(movie_id:string) {
    // fetches favourites from storage
    let favourites = await this.ds.get("favourites");
    // if it does not exist yet, make an empty array
    if (!favourites) {
      favourites = [];
    }
    // add the movie id to the array
    favourites.push(movie_id);
    // send the array back to storage
    await this.ds.set("favourites", favourites);
    // update isFavourite
    this.isFavourite = true;
  }

  async removeFromFavourites(movie_id:string) {
    // fetches favourites from storage
    let favourites = await this.ds.get("favourites");
    // if it does not exist yet, do nothing
    if (!favourites) return;
    // filters favourites array of the specified id
    const updatedFavourites = favourites.filter((id: string) => id !== movie_id);
    // send the array back to storage
    await this.ds.set("favourites", updatedFavourites);
    // update isFavourite
    this.isFavourite = false;
  }

}
