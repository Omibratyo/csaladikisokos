import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageItemUpdateComponent } from './storage-item-update.component';

describe('StorageItemUpdateComponent', () => {
  let component: StorageItemUpdateComponent;
  let fixture: ComponentFixture<StorageItemUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageItemUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
