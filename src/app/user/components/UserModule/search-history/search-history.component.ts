import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.getSearchHistory();
  }

  history: [];

  getSearchHistory() {

    this.userService.getHistory()
      .subscribe(
        (data: any) => {
          if (data.success) {
            this.history = data.result;
          }
        },
        err => console.log(err)
      )
  }

  deleteCity(cityName) {

    this.userService.deleteCity(cityName)
      .subscribe(
        (data: any) => {
          if (data.result.n == 1) {
            for (let i = 0; i < this.history.length; i++)
              if (cityName == this.history[i])
                this.history.splice(i, 1)
          }
        },
        err => console.log(err)
      )
  }

  deleteHistory() {

    this.userService.deleteHistory()
      .subscribe(
        (data: any) => {
          if (data.result.n == 1)
            this.history = [];
        },
        err => console.log(err)
      )
  }

}
