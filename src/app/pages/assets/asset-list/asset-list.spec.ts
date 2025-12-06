import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetList } from './asset-list';

describe('AssetList', () => {
  let component: AssetList;
  let fixture: ComponentFixture<AssetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
