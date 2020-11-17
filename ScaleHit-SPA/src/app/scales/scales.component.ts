import { Component, OnInit } from '@angular/core';
import { Scale } from '../_models/scale';
import { ActivatedRoute } from '@angular/router';
import { ScaleService } from '../_services/scale.service';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.css']
})
export class ScalesComponent implements OnInit {

  scales: Scale[];
 displayedColumns: string[] = ['scaleTitle', 'scaleCode', 'scaleStatus', 'scalefinished', 'scaleDates', 'editBtns'];
  // dataSource: '';
  constructor(private route: ActivatedRoute, private scaleService: ScaleService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
       this.scales = data['scales'];
       console.log(this.scales);
    });
  }



}
