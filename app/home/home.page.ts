import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardContent, IonCard, IonInput, IonButton } from '@ionic/angular/standalone';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../services/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCardContent, IonCard, CommonModule, IonInput, 
    FormsModule, IonButton],
})

export class HomePage {
  displayedMovies: any[] = []; // array to store movies to be displayed on the page
  keyword: string = ""; // for search input
  heading: string = ""; // for dynamic headings
  api_key: string = "2bef00b6e8260141111bda3da66d2688";

  constructor(
    private mhs:MoviesService,
    private ds:Data,
    private router: Router
  ) {}

  // on page load
  ngOnInit() {
    this.getTrendingMovies();
  }

  // fetch today's trending movies from API
  async getTrendingMovies() {
    const trendingOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.api_key
    }
    const result = await this.mhs.get(trendingOptions);
    this.displayedMovies = result.data.results; // assigns today's trending movies to the array to be displayed
    this.heading = "Today's Trending Movies"; // dynamic heading
  }

  // fetch search results from API
  async getSearch() {
    // if search box is empty, display trending movies
    if (!this.keyword) {
      this.getTrendingMovies();
      return;
    }
    const searchOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/search/movie?query=" + this.keyword + "&api_key=" + this.api_key
    }
    const result = await this.mhs.get(searchOptions);
    this.displayedMovies = result.data.results; // assign search result movies to the array to be displayed
    this.heading = "Showing results for: " + this.keyword; // dynamic heading
  }

  // sends movie's id to storage and opens movie-details page
  async openMovieDetails(movie_id: number) {
    await this.ds.set("id", movie_id);
    this.router.navigate(['/movie-details']);
  }

}

