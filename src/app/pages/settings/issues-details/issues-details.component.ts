import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../../../core/models/setting/issue.model';

@Component({
  selector: 'app-issues-details',
  templateUrl: './issues-details.component.html',
  styleUrls: ['./issues-details.component.scss'],
})
export class IssuesDetailsComponent implements OnInit {
  @Input() issue?: Issue;
  constructor() {}

  ngOnInit(): void {}
}
