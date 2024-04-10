import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { SubsManager } from 'src/app/common/utils/subs-manager';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends SubsManager implements OnInit {


  constructor() {
    super();
  }

  ngOnInit(): void {
    
  }

}
