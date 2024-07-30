import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorMetricsComponent } from './sensor-metrics.component';

describe('SensorMetricsComponent', () => {
  let component: SensorMetricsComponent;
  let fixture: ComponentFixture<SensorMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorMetricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
