import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermagemComponent } from './enfermagem.component';

describe('EnfermagemComponent', () => {
  let component: EnfermagemComponent;
  let fixture: ComponentFixture<EnfermagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnfermagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnfermagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
