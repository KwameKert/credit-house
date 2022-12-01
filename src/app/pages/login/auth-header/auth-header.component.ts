import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent implements OnInit {
  @Input() headline!: string;
  @Input() description!: string;
  constructor() {}

  ngOnInit(): void {}
}
