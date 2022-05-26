import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodStorageComponent } from './food-storage.component';

describe('FoodStorageComponent', () => {
  let component: FoodStorageComponent;
  let fixture: ComponentFixture<FoodStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
