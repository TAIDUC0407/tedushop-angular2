import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MessageContstants } from 'src/app/core/common/message.constant';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit', { static: false }) modalAddEdit!: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number = 10;
  public filter: string = '';
  public users: any = [];
  public entity: any;

  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex
      + '&pageSize=' + this.pageSize + '&filter=' + this.filter).subscribe(res => {
        this.users = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      });
  }
  loadRole(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe(res => {
        this.entity = res;
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showEditModal(id: any) {
    this.entity = this.loadRole(id);
    this.modalAddEdit.show();
  }
  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }
  saveChange(valid: boolean | null) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this._dataService.post('/api/appUser/add', JSON.parse(JSON.stringify(this.entity))).subscribe(res => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      } else {
        this._dataService.put('/api/appUser/update', JSON.parse(JSON.stringify(this.entity))).subscribe(res => {
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
    }
  }
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe(res => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
}
