// cours.component.ts
import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.scss'],
})
export class CoursComponent implements OnInit {
  cours: Cours[] = [];
  isLoading: boolean = false;

  constructor(private coursService: CoursService) { }

  ngOnInit() {
    this.loadCoursByIdProf();
  }

  loadCoursByIdProf() {
    this.isLoading = true;

    this.coursService.getCoursByIdProf().subscribe({
      next: (response) => {
        console.log(response)
        this.cours = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error while fetching cours:', error);
        this.isLoading = false;
      }
    });
  }


  onDeleteClick(courId: number) {
    this.coursService.removeCours(courId).subscribe({
      next: (response) => {
        console.log(response)
        this.cours = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error while fetching cours:', error);
        this.isLoading = false;
      }
    });
  }

  onAddClick() {

  }

}
