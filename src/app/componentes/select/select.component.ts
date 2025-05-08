import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TurmasService, Turma } from '../../services/turmas.service';

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {
  turmas: Turma[] = [];

  @Output() turmaSelecionada = new EventEmitter<number>();

  constructor(private turmasService: TurmasService) { }

  ngOnInit(): void {
    this.turmasService.getTurmas().subscribe(turmas => {
      this.turmas = turmas;
    });
  }

  onChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const turmaId = Number(selectElement.value);
    this.turmaSelecionada.emit(turmaId);
  }
}
