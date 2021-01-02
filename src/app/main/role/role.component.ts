import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MessageContstants } from 'src/app/core/common/message.constant';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild('modalAddEdit', { static: false }) modalAddEdit!: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number = 10;
  public filter: string = '';
  public roles: any = [];
  public entity: any;

  constructor(private _dataService: DataService,private _notificationService:NotificationService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex
      + '&pageSize=' + this.pageSize + '&filter=' + this.filter).subscribe(res => {
        this.roles = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal() {
    this.entity = {};
    this.modalAddEdit.show();
  }
  saveChange(valid:boolean | null){
    if(valid){
      if(this.entity.id == undefined){
        this._dataService.post('/api/appRole/add',JSON.parse(JSON.stringify(this.entity))).subscribe(res=>{
          this.loadData();
          this.modalAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        },error=>this._dataService.handleError(error));
      }
    }
  }
}
