import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  authUser: User | null = null;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.authUser = this.sessionService.getAuthUser();
  }
}
