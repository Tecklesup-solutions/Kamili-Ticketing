import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueriesService } from '../../services/queriesService.service';

@Component({
  selector: 'app-create-queries',
  templateUrl: './create-queries.component.html',
  styleUrls: ['./create-queries.component.scss']
})
export class CreateQueriesComponent implements OnInit {
  loading = false;
  queryForm!: FormGroup;

  @Output() queryCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private queriesService: QueriesService,
  ) {}

  ngOnInit(): void {
    this.queryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createQuery(): void {
    if (this.queryForm.valid) {
      this.loading = true;
      const formData = this.queryForm.value;

      this.queriesService.createQuery(formData).subscribe(
        (response) => {
          console.log(response)
          this.loading = false;
          this.queryForm.reset(); 
          // Emit event to parent component to indicate query creation
          this.queryCreated.emit();
        },
        (error) => {
          console.log(error)
          this.loading = false;
        }
      );
    }
  }
}
