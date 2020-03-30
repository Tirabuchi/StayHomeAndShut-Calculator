import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  pageForm = new FormGroup({
    density: new FormControl(0),
    obsTime: new FormControl(0),
    outTime: new FormControl(0),
    period: new FormControl(0),
    mode: new FormControl(false),
  });

  showResult: any = null;

  ngOnInit() {
  }
  

  onSubmit() {
    console.log(this.pageForm.value);
    this.calculate();
  }
  onReset() {
    this.showResult = null;
  }

  calculate() {
    const data = this.parseData(); // normalize values;
    console.log(data);
    const noOne = Math.pow((1 - (data.outTime) / ( data.period - data.obsTime )), data.density / 9 ) * 100;
    console.log(noOne);
    this.showResult = noOne.toFixed(2);
  
  }

  parseData() {  
    const parsedData = new Item();
    parsedData.density = this.pageForm.value.density;
    parsedData.obsTime = this.pageForm.value.obsTime / 60 * this.pageForm.value.period;
    parsedData.outTime = this.pageForm.value.outTime / 60;
    parsedData.period = this.pageForm.value.period * 24;
    return parsedData;
  }
}
export class Item {
  density: number;
  obsTime: number;
  outTime: number;
  period: number;
  mode: boolean;
}
