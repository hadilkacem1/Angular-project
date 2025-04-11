import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "src/models/Contact ";




@Injectable({
    providedIn: 'root'
  })
  export class ContactService {
    private apiUrl = 'http://localhost:8085/api/contact'; // URL de votre backend Spring Boot
  
    constructor(private http: HttpClient) {}
  
    // Créer un contact
    createContact(contact: Contact): Observable<Contact> {
      return this.http.post<Contact>(this.apiUrl, contact);
    }
  
   
    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${this.apiUrl}/Allcontact`);
      }  
    // Récupérer un contact par ID
    getContactById(id: number): Observable<Contact> {
      return this.http.get<Contact>(`${this.apiUrl}/${id}`);
    }
  
    // Mettre à jour un contact
    updateContact(id: number, contact: Contact): Observable<Contact> {
      return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
    }
  
    // Supprimer un contact
    deleteContact(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }