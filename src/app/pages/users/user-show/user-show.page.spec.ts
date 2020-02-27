import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserShowPage } from './user-show.page';

describe('UserShowPage', () => {
  let component: UserShowPage;
  let fixture: ComponentFixture<UserShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
