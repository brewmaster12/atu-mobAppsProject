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
  trendingMovies: any;
  keyword: string = "";

  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?api_key=2bef00b6e8260141111bda3da66d2688"
  }

  constructor(private mhs:MoviesService) {}

  ngOnInit() {
    this.trendingMovies = [];
    this.getMovies();
  }

  async getMovies() {
    let result = await this.mhs.get(this.options);
    console.log(result.data.results[1].title);
    console.log(result.data.results); // ARRAY of trending movies
    this.trendingMovies = result.data.results;

  }

}
