import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
