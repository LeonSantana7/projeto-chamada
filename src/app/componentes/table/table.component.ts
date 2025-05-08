import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AlunosService, Aluno } from '../../services/alunos.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() turmaId: number | null = null;
  @Output() chamadaFinalizada = new EventEmitter<void>();
  alunos: Aluno[] = [];
  presencas: { [alunoId: number]: boolean } = {};
  alunoIndex: number = 0;

  constructor(private alunosService: AlunosService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['turmaId'] && this.turmaId) {
      this.alunosService.getAlunosPorTurma(this.turmaId).subscribe(alunos => {
        this.alunos = alunos;
        this.resetPresencas();
        this.alunoIndex = 0;
      });
    }
  }

  resetPresencas(): void {
    this.presencas = {};
    this.alunos.forEach(aluno => {
      this.presencas[aluno.id] = false;
    });
  }

  falarNomeDoAlunoAtual(): void {
    if (this.alunos.length > 0 && this.alunoIndex < this.alunos.length) {
      const aluno = this.alunos[this.alunoIndex];
      this.falarNome(aluno.id);
    }
  }

  falarNome(alunoId: number): void {
    const aluno = this.alunos.find(a => a.id === alunoId);
    if (aluno) {
      const utterance = new SpeechSynthesisUtterance(aluno.nome);
      utterance.lang = 'pt-BR';


      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, i * 1500);
      }
    }
  }

  marcarPresenca(alunoId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.presencas[alunoId] = target.checked;
    }
  }

  avancarParaProximoAluno(): void {
    if (this.alunoIndex < this.alunos.length) {
      const aluno = this.alunos[this.alunoIndex];
      this.falarNome(aluno.id);
      this.alunoIndex++;
    } else {
      this.chamadaFinalizada.emit();
      alert('Todos os alunos foram chamados!');
    }
  }

  gerarRelatorioPDF(): void {
    const presentes = this.alunos.filter(aluno => this.presencas[aluno.id]);
    const ausentes = this.alunos.filter(aluno => !this.presencas[aluno.id]);

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório de Presença', 20, 20);
    doc.setFontSize(12);

    let yPosition = 30;


    doc.text('Presentes:', 20, yPosition);
    yPosition += 10;
    presentes.forEach((aluno, index) => {
      doc.text(`${index + 1}. ${aluno.nome}`, 20, yPosition);
      yPosition += 10;
    });

    doc.text('Ausentes:', 20, yPosition);
    yPosition += 10;
    ausentes.forEach((aluno, index) => {
      doc.text(`${index + 1}. ${aluno.nome}`, 20, yPosition);
      yPosition += 10;
    });


    doc.save('relatorio_presenca.pdf');
  }
}
