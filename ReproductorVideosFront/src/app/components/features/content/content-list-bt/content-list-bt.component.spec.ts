import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentListBtComponent } from './content-list-bt.component';

describe('ContentListBtComponent', () => {
  let component: ContentListBtComponent;
  let fixture: ComponentFixture<ContentListBtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentListBtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentListBtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
