import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonList, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonList, IonButton, IonIcon]
})
export class DetailsPage implements OnInit {

  person_id:string = "";
  person:any;
  credits:any;
  api_key: string = "2bef00b6e8260141111bda3da66d2688";

  constructor(
      private mhs:MoviesService,
      private ds:Data,
      private router: Router
    ) {
      addIcons({ heart, home });  // for icons
    }

  ngOnInit() {
  }
 
  // this runs every time the page is opened, not just when first loaded like ngOnInit()
  ionViewWillEnter() {
    this.getPersonId();
  }

  // gets id value from storage and assigns as person_id
  async getPersonId() {
    this.person_id = await this.ds.get('id');
    this.getPersonData();
    this.getPersonCredits();
  }

  // gets person's data from API
  async getPersonData() {
    const personDataOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + this.person_id + "?api_key=" + this.api_key
    }
    const result = await this.mhs.get(personDataOptions);
    this.person = result.data
  }

  // gets person's movie credits from API (different object to the person itself with different URL)
  async getPersonCredits() {
    const personCreditsOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + this.person_id + "/movie_credits" + "?api_key=" + this.api_key
    }
    const result = await this.mhs.get(personCreditsOptions);
    this.credits = result.data;
    console.log(this.credits)
  }

  openFavourites() {
    this.router.navigate(['/favourites']);
  }

  openHome() {
    this.router.navigate(['/home']);
  }

  // sends movie's id to storage and opens movie-details page
  async openMovieDetails(movie_id: number) {
    await this.ds.set("id", movie_id);
    this.router.navigate(['/movie-details']);
  }

}
