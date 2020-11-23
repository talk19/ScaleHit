import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Scale } from 'src/app/_models/scale';
import { ActivatedRoute } from '@angular/router';
import { ScaleService } from 'src/app/_services/scale.service';

@Component({
  selector: 'app-createScale',
  templateUrl: './createScale.component.html',
  styleUrls: ['./createScale.component.css']
})
export class CreateScaleComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  scale: any = {};
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }



}
