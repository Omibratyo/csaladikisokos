import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BathroomStorageComponent } from './bathroom-storage.component';

describe('BathroomStorageComponent', () => {
  let component: BathroomStorageComponent;
  let fixture: ComponentFixture<BathroomStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BathroomStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BathroomStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
