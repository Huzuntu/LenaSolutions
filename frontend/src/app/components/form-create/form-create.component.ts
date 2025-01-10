import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent 
{
  form: any = 
  {
    name: '',
    description: '',
    fields: []
  };

  constructor(private formService: FormService, private router: Router) {}

  createForm() {
    console.log(this.form);
    this.formService.createForm(this.form).subscribe(
      {
        next: (response) => {
          console.log(response);
          if (response.success) 
          {
            this.router.navigate(['/form-list']);
          }
          else 
          {
            alert('Form creation failed');
          }
        },
        error: (error) => {
          console.error('Error creating form', error);
          alert('Form creation failedd');
        },
        complete: () => {

        }
      }
      
      
    );
  }

  addField()
  {
    this.form.fields.push({ name: '', dataType: 'STRING', required: false });
  }

  removeField(index: number) 
  {
    this.form.fields.splice(index, 1);
  }
}