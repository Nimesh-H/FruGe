import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowestPriceComponent } from './lowest-price.component';

describe('LowestPriceComponent', () => {
  let component: LowestPriceComponent;
  let fixture: ComponentFixture<LowestPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowestPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LowestPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
