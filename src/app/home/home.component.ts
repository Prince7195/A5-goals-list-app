import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),
        
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
        ]), { optional: true }),
        
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 })
          ]))
        ]), { optional: true })

      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  itemCount: number;
  btnTxt: string = "Add item";
  goalText: string = "My first life goal!";
  goals = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.goal.subscribe(
      res => this.goals = res
    );
    this._dataService.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = "";
    this._dataService.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  removeItem(index) {
    this.goals.splice(index, 1);
    this._dataService.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

}
