import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from './generc-table.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class GenericTableComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() columnsToDisplay!: TableColumn[];
  @Input() displayColumns!: string[];
  @Input() data!: any;
  @Input() template!: TemplateRef<any>;
  @Input() expandableRow: boolean = true;
  @Output() selectedElementValue = new EventEmitter<any>();
  columnsToDisplayWithExpand!: string[];
  expandedElement: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectElement(element: any, $event: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
    $event.stopPropagation();
    this.selectedElementValue.emit(element);
  }
}
