import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Scale } from 'src/app/_models/scale';
import { ActivatedRoute } from '@angular/router';
import { ScaleService } from 'src/app/_services/scale.service';
import { MyErrorStateMatcher } from 'src/app/_services/validators.service';

@Component({
  selector: 'app-createScale',
  templateUrl: './createScale.component.html',
  styleUrls: ['./createScale.component.css'],
})
export class CreateScaleComponent implements OnInit {
  createScaleForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  navigationTypes = [
    { value: 'linear', text: 'לינארי' },
    { value: 'free', text: 'חופשי' },
  ];
  scaleTypes = [
    { value: 'time', text: 'תאריכים' },
    { value: 'stages', text: 'שלבים' },
    { value: 'other', text: 'יחידות מידה' },
  ];
  dateTypes = [
    { value: 'years', text: 'שנים' },
    { value: 'monthYear', text: 'חודש ושנה' },
    { value: 'date', text: 'תאריך מדויק' },
  ];
  // monthList = [
  //   { value: '1', text: 'ינואר' },
  //   { value: '2', text: 'פברואר' },
  //   { value: '3', text: 'מרץ' },
  //   { value: '4', text: 'אפריל' },
  //   { value: '5', text: 'מאי' },
  //   { value: '6', text: 'יוני' },
  //   { value: '7', text: '' },
  //   { value: '8', text: '' },
  //   { value: '9', text: '' },
  //   { value: '10', text: '' },
  //   { value: '11', text: '' },
  //   { value: '12', text: '' },
  // ];
  // showTime = false;

  @ViewChild('editForm', { static: true }) editForm: NgForm;
  scale: any = {};
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.createNewForm();
  }

  createNewForm() {
    this.createScaleForm = this.fb.group({
      scaleName: ['', Validators.required],
      scaleTopic: ['', Validators.required],
      navigationType: ['', Validators.required],
      showGrade: ['', Validators.required],
      scaleType: ['', Validators.required],
      dateType: [''],
      startYear: [''],
      endYear: [''],
      startMonth: [''],
      endMonth: [''],
      // startDate: [''],
      // endDate: [''],
      // unitName: [''],
      // startUnit: [''],
      // endUnit: ['']
    });

    this.createScaleForm.controls.scaleType.valueChanges.subscribe((values) => {
      switch (values) {
        case 'time':
          this.createScaleForm.controls.dateType.setValidators([
            Validators.required,
          ]);
          break;

        case 'stages':
          break;

        case 'other':
          break;
      }
      this.createScaleForm.controls.dateType.updateValueAndValidity();
    });

    this.createScaleForm.controls.dateType.valueChanges.subscribe((values) => {
      switch (values) {
        case 'years':
          this.createScaleForm.controls.startYear.setValidators([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
          ]);
          this.createScaleForm.controls.endYear.setValidators([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
          ]);
          break;
        case 'monthYear':
          break;
        case 'date':
          break;
      }
    });
  }
  chosenYearHandler(e) {
    console.log(e);
  }
}
