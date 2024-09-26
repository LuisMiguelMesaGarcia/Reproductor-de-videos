import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListVtComponent } from './content-list-vt.component';

describe('ContentListVtComponent', () => {
  let component: ContentListVtComponent;
  let fixture: ComponentFixture<ContentListVtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentListVtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentListVtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
