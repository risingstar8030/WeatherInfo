import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'


@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.getListOfCities();
    this.recentlySearchedCity();
  }

  d = new Date();
  p = 1;
  searchText: string;
  display = false;
  cities: any;
  city: any;
  todayInfo: any;

  getListOfCities() {

    this.cities = JSON.parse(localStorage.getItem("ListOfCities"));

    if (!this.cities) {

      this.userService.listOfCities()
        .subscribe(
          (data: any) => {
            if (data.success) {
              let list = data.result
              localStorage.setItem("ListOfCities", JSON.stringify(list))
              this.cities = JSON.parse(localStorage.getItem("ListOfCities"));
            }
          },
          (err) => {
            console.log(err)
          }
        )

    }


  }


  recentlySearchedCity() {

    this.city = JSON.parse(localStorage.getItem("CurrentCity"))
    if (this.city) {
      this.todayInfo = this.city[0];
      this.city.splice(0, 1)
    }
  }

  getWeatherInfo(cityname) {

    this.userService.weatherInfo(cityname)
      .subscribe(
        (data: any) => {
          if (data.success) {
            let cityInfo = data.result;
            localStorage.setItem('CurrentCity', JSON.stringify(cityInfo));
            this.city = JSON.parse(localStorage.getItem("CurrentCity"))
            this.todayInfo = this.city[0];
            this.city.splice(0, 1)
          }
        },
        err => console.log(err)
      )
  }


}
