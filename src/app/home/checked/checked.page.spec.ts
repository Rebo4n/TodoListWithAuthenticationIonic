import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckedPage } from './checked.page';

describe('CheckedPage', () => {
  let component: CheckedPage;
  let fixture: ComponentFixture<CheckedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
