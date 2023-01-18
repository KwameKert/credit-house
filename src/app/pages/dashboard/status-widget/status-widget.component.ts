import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-widget',
  templateUrl: './status-widget.component.html',
  styleUrls: ['./status-widget.component.scss'],
})
export class StatusWidgetComponent implements OnInit {
  @Input() active = 0;
  @Input() inactive = 0;
  constructor() {}

  ngOnInit(): void {}
}
