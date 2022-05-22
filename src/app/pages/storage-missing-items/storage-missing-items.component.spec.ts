import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageMissingItemsComponent } from './storage-missing-items.component';

describe('StorageMissingItemsComponent', () => {
  let component: StorageMissingItemsComponent;
  let fixture: ComponentFixture<StorageMissingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageMissingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageMissingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
