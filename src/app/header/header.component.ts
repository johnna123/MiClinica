import { Component, OnInit } from '@angular/core';
import {FileSystemService} from '../services/file-system.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private fileservice: FileSystemService,
  ) { }

  ngOnInit(): void {
  }

  close():void{
    this.fileservice.custom_close();
  }

}
