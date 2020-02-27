import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileShowPage } from './profile-show.page';

describe('ProfileShowPage', () => {
  let component: ProfileShowPage;
  let fixture: ComponentFixture<ProfileShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
