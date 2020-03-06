//angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//servicios
import { PlanService } from '../../../services/plan/plan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plan-show',
  templateUrl: './plan-show.page.html',
  styleUrls: ['./plan-show.page.scss'],
})
export class PlanShowPage implements OnInit {

  plan: any = [];
  planSubscription: Subscription;
  constructor(
    private planService: PlanService,
    public activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
  }

  doRefresh(event) {
    this.planSubscription.unsubscribe();
    console.log('refresh');
    this.ionViewWillEnter();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
  }

  ionViewWillEnter(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.planSubscription = this.planService.getPlan(id).subscribe(result => {
      this.plan = result['data'];
      console.log(this.plan);
      this.planSubscription.unsubscribe();
    });
  }

}
