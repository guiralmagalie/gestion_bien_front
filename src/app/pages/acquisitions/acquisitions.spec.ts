import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acquisitions } from './acquisitions';

describe('Acquisitions', () => {
  let component: Acquisitions;
  let fixture: ComponentFixture<Acquisitions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Acquisitions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acquisitions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
