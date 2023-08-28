import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGeneratorComponent } from './code-generator.component';

describe('CodeGeneratorComponent', () => {
  let component: CodeGeneratorComponent;
  let fixture: ComponentFixture<CodeGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeGeneratorComponent]
    });
    fixture = TestBed.createComponent(CodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
