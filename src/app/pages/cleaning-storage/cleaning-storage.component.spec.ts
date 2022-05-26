import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningStorageComponent } from './cleaning-storage.component';

describe('CleaningStorageComponent', () => {
  let component: CleaningStorageComponent;
  let fixture: ComponentFixture<CleaningStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
