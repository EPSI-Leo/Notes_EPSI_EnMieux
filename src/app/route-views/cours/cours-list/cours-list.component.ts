// cours.component.ts
import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.scss'],
})
export class CoursComponent implements OnInit {
  cours: any[] = [];
  isLoading: boolean = false;

  constructor(private coursService: CoursService) {}

  ngOnInit() {
    this.loadCoursByIdProf();
  }

  loadCoursByIdProf() {
    this.isLoading = true;

    this.coursService.getCoursByIdProf().subscribe(
      (cours) => {
        this.cours = cours;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error while fetching cours:', error);
        this.isLoading = false;
        //TODO Gérer l'erreur, par exemple, afficher un message à l'utilisateur
      }
    );
  }

  onEditClick(courId: number) {
    //TODO
    console.log(`Édition du cours ${courId}`);
  }

  onDeleteClick(courId: number) {
    //TODO
    console.log(`Suppression du cours ${courId}`);
  }

  onAddClick() {

  }

}
