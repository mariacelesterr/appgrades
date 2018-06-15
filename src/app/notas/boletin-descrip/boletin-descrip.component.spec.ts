import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinDescripComponent } from './boletin-descrip.component';

describe('BoletinDescripComponent', () => {
  let component: BoletinDescripComponent;
  let fixture: ComponentFixture<BoletinDescripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinDescripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinDescripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
