import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageItemAddComponent } from './storage-item-add.component';

describe('StorageItemAddComponent', () => {
  let component: StorageItemAddComponent;
  let fixture: ComponentFixture<StorageItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
