import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})
export class CitiesListComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCitiesWeather();
  }

  cities: any;
  list : any;

  getCitiesWeather() { // Function will display cities with todays weather

    this.cities = JSON.parse(localStorage.getItem("CitiesWeather"));

    if (!this.cities) {

      this.userService.getCitiesWeather()
        .subscribe(
          (data: any) => {
            if (data.success) {
              let cities = data.result;
              localStorage.setItem("CitiesWeather", JSON.stringify(cities))
              this.cities = JSON.parse(localStorage.getItem("CitiesWeather"));
            }
          },
          (err) => {
            console.log(err)
          }
        )
    }

  }

}
