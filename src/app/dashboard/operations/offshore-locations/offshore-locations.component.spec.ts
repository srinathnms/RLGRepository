import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffshoreLocationsComponent } from './offshore-locations.component';

describe('OffshoreLocationsComponent', () => {
  let component: OffshoreLocationsComponent;
  let fixture: ComponentFixture<OffshoreLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffshoreLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffshoreLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
