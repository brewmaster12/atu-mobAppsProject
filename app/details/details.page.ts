import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { MoviesService } from '../services/movies-service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {

  person_id:string = "";
  personData:string = ""
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
  }

  async getPersonData() {
    const personDataOptions: HttpOptions = {
      url: "https://api.themoviedb.org/3/movie/" + this.person_id + "/credits?api_key=" + this.api_key
    }
    const result = await this.mhs.get(personDataOptions);
    console.log(result)
    this.personData = result.data
    console.log(this.personData)
  }

}
