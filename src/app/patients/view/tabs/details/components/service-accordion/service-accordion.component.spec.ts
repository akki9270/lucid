import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccordionComponent } from './service-accordion.component';

describe('ServiceAccordionComponent', () => {
  let component: ServiceAccordionComponent;
  let fixture: ComponentFixture<ServiceAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
