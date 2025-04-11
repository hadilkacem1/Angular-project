import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/services/EmployeService';
import { Employe } from 'src/models/Employe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.css']
})
export class ModifierEmployeComponent {
  employe: Employe; // Employé à modifier

  constructor(
    public dialogRef: MatDialogRef<ModifierEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employe, // Données de l'employé à modifier
    private employeeService: EmployeeService
  ) {
    this.employe = { ...data }; // Copie des données pour éviter la modification directe
  }

  // Fermer le modal sans sauvegarder
  onCancel(): void {
    this.dialogRef.close();
  }

  // Sauvegarder les modifications
  onSave(): void {
    // Vérifier que l'ID est défini avant de l'utiliser
    if (this.employe.id !== undefined) {
      this.employeeService.updateEmployee(this.employe.id, this.employe).subscribe({
        next: () => {
          Swal.fire('Succès!', 'L\'employé a été modifié avec succès.', 'success');
          this.dialogRef.close(true); // Fermer le modal et indiquer que la modification a réussi
        },
        error: (error) => {
          console.error('Erreur lors de la modification de l\'employé', error);
          Swal.fire('Erreur!', 'Une erreur est survenue lors de la modification.', 'error');
        }
      });
    } else {
      // Si l'ID est undefined, afficher un message d'erreur
      Swal.fire('Erreur!', 'ID de l\'employé manquant.', 'error');
    }
  }
}