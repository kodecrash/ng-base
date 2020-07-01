import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: Array<any>;
  @Input() tableConfig: any;
  @Input() settings: any;
  @Input() columns: Array<any>;
  @Output() loadTable = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  public rows: Array<any> = [];
  public page = 1;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public config: any = {
    paging: true,
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered'],
    itemsPerPage: 5
  };

  constructor() { }

  ngOnInit() {
    console.log('Table Data');
    console.log(this.data);
    if (this.tableConfig) {
      this.config = Object.assign(this.config, this.tableConfig);
    }

    if (this.settings && this.settings.columns) {
      this.columns = Object.keys(this.settings.columns);
    }

    if (this.data) {
      this.length = this.data.length;
      this.onChangeTable(this.config);
    }


  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.config.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
    this.loadTable.emit(this.rows);
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    if (this.columns && this.columns.length > 0 ) {
      this.columns .forEach((column: any) => {
        if (column.filtering) {
          filteredData = filteredData.filter((item: any) => {
            return item[column].match(column);
          });
        }
      });
    }

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;

      this.columns.forEach((column: any) => {
        if (item[column].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    const pageRows = data.slice(start, end);
    this.pageChange.emit(pageRows);
    return pageRows;
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;
    for (const col of columns) {
      if (col.sort !== '' && col.sort !== false) {
        columnName = col.name;
        sort = col.sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public onCellClick(data: any): any {
    console.log(data);
  }



}
