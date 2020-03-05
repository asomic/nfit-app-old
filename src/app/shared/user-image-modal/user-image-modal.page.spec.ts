import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserImageModalPage } from './user-image-modal.page';

describe('UserImageModalPage', () => {
  let component: UserImageModalPage;
  let fixture: ComponentFixture<UserImageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserImageModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserImageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
