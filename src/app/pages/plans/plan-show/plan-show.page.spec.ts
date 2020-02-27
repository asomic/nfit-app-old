import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanShowPage } from './plan-show.page';

describe('PlanShowPage', () => {
  let component: PlanShowPage;
  let fixture: ComponentFixture<PlanShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
