import { Component, OnInit } from '@angular/core';

//servicios
import { PlanService } from '../../../services/plan/plan.service';

@Component({
  selector: 'app-plan-index',
  templateUrl: './plan-index.page.html',
  styleUrls: ['./plan-index.page.scss'],
})
export class PlanIndexPage implements OnInit {
  public userActualPlan: any;
  public filteredPlans: any;
  public plans: any;
  public selectedFilter1 = true;
  public selectedFilter3 = false;
  public selectedFilter5 = false;
  public selectedFilter6 = false;  

  constructor(
    private planService: PlanService,
  ) { }

  ngOnInit() {

  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
        event.target.complete();
    }, 1000);
  }

  ionViewWillEnter() {
    this.planService.actualPlan().subscribe(result => {
      this.userActualPlan = result['data'];
    });
    this.planService.getPlans().subscribe(result => {
      this.plans = result['data'];
      this.filteredPlans = this.plans.filter(
        plan => (plan.periodId === 1) && (plan.contractable) && (!plan.convenio)
      );
    });
  }

  planFilter(id) {
    switch (id) {
        case 1:
            this.selectedFilter1 = true;
            this.selectedFilter3 = false;
            this.selectedFilter5 = false;
            this.selectedFilter6 = false;
            break;

        case 3:
            this.selectedFilter1 = false;
            this.selectedFilter3 = true;
            this.selectedFilter5 = false;
            this.selectedFilter6 = false;
            break;

        case 5:
            this.selectedFilter1 = false;
            this.selectedFilter3 = false;
            this.selectedFilter5 = true;
            this.selectedFilter6 = false;
            break;

        case 6:
            this.selectedFilter1 = false;
            this.selectedFilter3 = false;
            this.selectedFilter5 = false;
            this.selectedFilter6 = true;
            break;
        default:
    }
    this.filteredPlans = this.plans.filter(
        plan => (plan.periodId === id) && (plan.contractable) && (!plan.convenio)
    );
  }


}
