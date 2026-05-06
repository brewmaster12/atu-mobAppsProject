import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle]
})
export class MovieDetailsPage implements OnInit {

  movie_id:string = "";
  api_key: string = "2bef00b6e8260141111bda3da66d2688";
  movieCredits:any;
  movie:any;

  constructor(
    private mhs:MoviesService,
    private ds:Data
  ) { }

  ngOnInit() {
    this.getMovieId();
  }

  async getMovieId() {
    this.movie_id = await this.ds.get('movie_id');
    this.getMovie();
    this.getMovieCredits();
  }

  async getMovieCredits() {
    const movieCreditsOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/" + this.movie_id + "/credits?api_key=" + this.api_key
    }
    const result = await this.mhs.get(movieCreditsOptions);
    console.log(result)
    this.movieCredits = result.data
    console.log(this.movieCredits)
  }

  async getMovie() {
    const movieOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/" + this.movie_id + "?api_key=" + this.api_key
    }
    const result = await this.mhs.get(movieOptions);
    this.movie = result.data
    console.log(this.movie)
  }

  openDetails() {
    console.log("Opening details page ...");
  }

}
