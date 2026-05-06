import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonList } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonItem, IonList]
})
export class DetailsPage implements OnInit {

  person_id:string = "";
  person:any;
  credits:any;
  api_key: string = "2bef00b6e8260141111bda3da66d2688";

  constructor(
      private mhs:MoviesService,
      private ds:Data,
    ) {}

  ngOnInit() {
    this.getPersonId();
  }

  async getPersonId() {
    this.person_id = await this.ds.get('id');
    this.getPersonData();
    this.getPersonCredits();
  }

  async getPersonData() {
    const personDataOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + this.person_id + "?api_key=" + this.api_key
    }
    const result = await this.mhs.get(personDataOptions);
    this.person = result.data
  }

  async getPersonCredits() {
    const personCreditsOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/person/" + this.person_id + "/combined_credits" + "?api_key=" + this.api_key
    }
    const result = await this.mhs.get(personCreditsOptions);
    this.credits = result.data;
    console.log(this.credits)
  }

}
