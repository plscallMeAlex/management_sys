import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentpgComponent } from './documentpg.component';

describe('DocumentpgComponent', () => {
  let component: DocumentpgComponent;
  let fixture: ComponentFixture<DocumentpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentpgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
