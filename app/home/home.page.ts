import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonCard, IonInput, IonButton } from '@ionic/angular/standalone';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonCard, CommonModule, IonInput, FormsModule, IonButton],
})
export class HomePage {
  displayedMovies: any[] = [];
  keyword: string = "";
  api_key: string = "2bef00b6e8260141111bda3da66d2688";

  constructor(private mhs:MoviesService) {}

  ngOnInit() {
    this.getTrendingMovies();
  }

  async getTrendingMovies() {

    const trendingOptions: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=" + this.api_key
  }

    const result = await this.mhs.get(trendingOptions);
    this.displayedMovies = result.data.results;
  }

  async searchButton() {
    
    const searchOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/search/movie?query=" + this.keyword + "&api_key=" + this.api_key
    }

    const result = await this.mhs.get(searchOptions);
    this.displayedMovies = result.data.results;
    if (!this.keyword) this.getTrendingMovies();
  }

}

