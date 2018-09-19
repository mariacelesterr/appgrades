import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinDescripDetallesComponent } from './boletin-descrip-detalles.component';

describe('BoletinDescripDetallesComponent', () => {
  let component: BoletinDescripDetallesComponent;
  let fixture: ComponentFixture<BoletinDescripDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinDescripDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinDescripDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
