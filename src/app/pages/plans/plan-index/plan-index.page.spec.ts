import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanIndexPage } from './plan-index.page';

describe('PlanIndexPage', () => {
  let component: PlanIndexPage;
  let fixture: ComponentFixture<PlanIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
