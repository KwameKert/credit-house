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
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination, TableColumn } from './generc-table.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  @Input() totalRows!: number;
  @Input() pageSize!: number;
  @Input() currentPage!: number;
  @Input() template!: TemplateRef<any>;
  @Input() expandableRow: boolean = true;
  @Output() selectedElementValue = new EventEmitter<any>();
  @Output() loadPageData = new EventEmitter<Pagination>();
  columnsToDisplayWithExpand!: string[];
  expandedElement: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
      this.dataSource = new MatTableDataSource(this.data);
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalRows;
      });
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

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadPageData.emit({ page: this.currentPage, size: this.pageSize });
  }
}
