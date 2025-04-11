import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employe } from 'src/models/Employe';
import { EmployeeService } from 'src/services/EmployeService';
import { ModifierEmployeComponent } from '../modifier-employe/modifier-employe.component';
import Swal from 'sweetalert2'; // Importer SweetAlert2
import { AjputerEmployeComponent } from '../ajputer-employe/ajputer-employe.component';

@Component({
  selector: 'app-liste-employes',
  templateUrl: './liste-employes.component.html',
  styleUrls: ['./liste-employes.component.css'],
})
export class ListeEmployesComponent implements OnInit {
  employes: Employe[] = [];
  searchTerm: string = '';
  p:number=1;
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Charger la liste des employés
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employes = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des employés', error);
      },
    });
  }

  // Ouvrir la modale d'ajout d'un nouvel employé
  openAddModal(): void {
    const dialogRef = this.dialog.open(AjputerEmployeComponent, {
      width: '500px',
      data: null, // Passer null pour indiquer un ajout
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadEmployees(); // Recharger si l'ajout est réussi
      }
      this.loadEmployees(); 
    });
  }

  // Ouvrir la modale de modification
  openEditModal(employe: Employe): void {
    const dialogRef = this.dialog.open(ModifierEmployeComponent, {
      width: '500px',
      data: employe,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

    // Filtrer les employés par nom
    get filteredEmployees(): Employe[] {
      return this.employes.filter((employe) =>
        employe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  

  // Supprimer un employé
  deleteEmployee(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            Swal.fire('Supprimé !', 'L\'employé a été supprimé.', 'success');
            this.loadEmployees();
          },
          error: (error) => {
            Swal.fire('Erreur !', 'La suppression a échoué.', 'error');
            console.error('Erreur lors de la suppression', error);
          },
        });
      }
    });
  }
}
