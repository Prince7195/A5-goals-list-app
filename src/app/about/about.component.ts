import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  goals: any;

  constructor( private route: ActivatedRoute, 
               private router: Router,
               private _dataService: DataService ) { 
                  this.route.params.subscribe(
                    res => console.log(res)
                  );
               }

  ngOnInit() {
    this._dataService.goal.subscribe(
      res => this.goals = res
    );
  }

  sendHome() {
    this.router.navigate(['']);
  }

}
