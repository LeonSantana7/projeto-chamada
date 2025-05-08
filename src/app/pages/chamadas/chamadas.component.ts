import { Component, OnInit, ViewChild } from '@angular/core';
import { TurmasService, Turma } from '../../services/turmas.service';
import { SelectComponent } from '../../componentes/select/select.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../componentes/table/table.component';

@Component({
  selector: 'app-chamadas',
  standalone: true,
  imports: [SelectComponent, CommonModule, TableComponent],
  templateUrl: './chamadas.component.html',
  styleUrls: ['./chamadas.component.css']
})
export class ChamadaComponent implements OnInit {
  turmas: Turma[] = [];
  turmaSelecionadaId: number | null = null;


  @ViewChild(TableComponent) tableComponent!: TableComponent;

  constructor(private turmasService: TurmasService) { }

  ngOnInit() {

    this.turmasService.getTurmas().subscribe(turmas => {
      this.turmas = turmas;
    });
  }


  onTurmaSelecionada(turmaId: number) {
    this.turmaSelecionadaId = turmaId;
  }


  confirmarChamada(): void {

    if (this.tableComponent) {
      this.tableComponent.gerarRelatorioPDF();
      alert('Chamada confirmada!');
    } else {
      console.error('Erro: Componente Table não encontrado!');
    }
  }
}
