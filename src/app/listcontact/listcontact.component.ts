import { Component } from '@angular/core';
import { Contact } from 'src/models/Contact ';
import { ContactService } from 'src/services/ContactService';
import { AjoutercontactComponent } from '../ajoutercontact/ajoutercontact.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModifiercontactComponent } from '../modifiercontact/modifiercontact.component';

@Component({
  selector: 'app-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.css']
})
export class ListcontactComponent {
  contacts: Contact[] = []; // Tableau pour stocker les contacts
  

  constructor(private contactService: ContactService,private dialog: MatDialog) { }

 
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data; // Mettre à jour la liste des contacts
      },
      error: (err) => {
        console.error('Erreur lors du chargement des contacts :', err);
        Swal.fire('Erreur', 'Impossible de charger les contacts.', 'error');
      }
    });
  }

    openAddModal(): void {
      const dialogRef = this.dialog.open(AjoutercontactComponent, {
        width: '500px',
        data: null, // Passer null pour indiquer un ajout
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
        //  this.; // Recharger si l'ajout est réussi
        }
      //  this.loadEmployees(); 
      this.loadContacts();
      });
   
      
    }
    
    openEditModal(contact: Contact): void {
      const dialogRef = this.dialog.open(ModifiercontactComponent, {
        width: '500px',
        data: contact,
      });
    
      // Vous pouvez charger les contacts après la fermeture du modal.
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          // Vous pouvez ajouter des actions ici si nécessaire, par exemple pour traiter des modifications spécifiques
        }
        // Rechargez la liste des contacts après la fermeture du modal
        this.loadContacts();  // Ajoutez les parenthèses ici pour appeler la méthode
      });
    }
    
  

  // Fonction de modification d'un contact
  editContact(contact: any): void {
    console.log('Modifier le contact', contact);
    // Ici, vous pouvez rediriger l'utilisateur vers une page d'édition ou ouvrir un formulaire modal
  }

  // Fonction de suppression d'un contact
  deleteContact(contactId: number): void {
    // Affichage d'une fenêtre de confirmation avant de supprimer
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme la suppression
        console.log('Supprimer le contact avec l\'ID', contactId);
        this.contactService.deleteContact(contactId).subscribe(() => {
          // Rafraîchir la liste des contacts après la suppression
          this.contacts = this.contacts.filter(contact => contact.id !== contactId);
          Swal.fire(
            'Supprimé!',
            'Le contact a été supprimé.',
            'success'
          );
        }, (error) => {
          // Gérer les erreurs en cas d'échec de la suppression
          console.error('Erreur lors de la suppression du contact :', error);
          Swal.fire(
            'Erreur',
            'Il y a eu un problème avec la suppression du contact.',
            'error'
          );
        });
      }
    });
  }
  
}
