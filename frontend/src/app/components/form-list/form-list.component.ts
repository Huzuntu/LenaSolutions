import { Component } from '@angular/core';
import { Form } from '../../models/form.model';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormField } from '../../models/formField.model';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss'
})
export class FormListComponent 
{
  searchTerm = '';
  forms: Form[] = [];
  isCreateFormModalOpen = false;
  selectedForm: any = null;

  newForm: Form = 
  { 
    id: 0, 
    name: '', 
    description: '', 
    createdAt: '', 
    createdBy: '', 
    fields: [] 
  };

  constructor(private formService: FormService, private router: Router, private authService: AuthService) 
  {
    this.loadForms();
  }

  loadForms() 
  {
    this.formService.getForms().subscribe(
      {
        next: (response: Form[]) => {
          this.forms = response;
        },
        error: (error) => {
          console.error('Error loading forms', error);
        },
        complete: () => {
          console.log("Forms loaded");
        }
      }
    );
  }

  get filteredForms() 
  {
    return this.forms.filter((form) =>
      form.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateFormModal() 
  {
    this.isCreateFormModalOpen = true;
  }

  closeCreateFormModal() 
  {
    this.isCreateFormModalOpen = false;
  }

  addField() 
  {
    const newField: FormField = {
      id: 0, 
      name: '',
      required: false,
      dataType: 'string', 
      formId: 0,
    };
    this.newForm.fields.push(newField);
  }

  createForm() {
    const loggedInUserId = this.authService.getUserId(); 
  
    if (this.newForm.name && this.newForm.description) 
    {
      this.newForm.createdAt = new Date().toISOString();
      this.newForm.createdBy = loggedInUserId;
      console.log(this.newForm.fields);
      this.newForm.fields.forEach(field => 
      {
        field.formId = 0;
      });
      console.log('Form Data:', JSON.stringify(this.newForm, null, 2));
      this.formService.createForm(this.newForm).subscribe(
        {
          next: (response) => {
            alert('Form created successfully');
            this.loadForms();
            this.closeCreateFormModal();
          },
          error: (error) => {
            console.error('Error creating form', error);
            alert('Form creation failed');
          },
          complete: () => 
          {
            console.log("Form created");
          }
        }
      );
    } else {
      alert('Form name and description are required.');
    }
  }
  
  viewForm(form: any) {

    this.selectedForm = form; 
  }

  closeFormModal() {
    this.selectedForm = null; 
  }


  deleteForm(formId: number) 
  {
    if (confirm('Are you sure you want to delete this form?')) 
    {
      this.formService.deleteForm(formId).subscribe(
        {
          next: (response) => {
            console.log('Form deleted:', response);
            this.loadForms(); 
          },
          error: (error) => {
            console.error('Error deleting form:', error);
          },
          complete: () => {
            console.log('Form deleted');
          }
        }
        
      );
    }
  }
}
