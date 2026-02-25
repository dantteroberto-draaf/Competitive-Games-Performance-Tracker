import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Partida } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  filtroAtual = 'Todos';
  // Variável para guardar a lista de partidas que vem do Python
  partidas: Partida[] = [];
  partidasFiltradas: Partida[] = [];

  totalPartidas = 0;
  totalVitorias = 0;
  totalDerrotas = 0;
  winRate = 0;
  totalAbates = 0;
  totalMortes = 0;
  totalAssistencias = 0;
  ama_medio = 0;

  novaPartida: Partida = {
    jogo: 'Valorant',
    resultado: 'Vitória',
    abates: 0,
    mortes: 0,
    assistencias: 0
  };


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.carregarPartidas();
  }

  calcularEstatisticas(){

    this.totalVitorias = 0;
    this.totalDerrotas = 0;
    this.totalAbates = 0;
    this.totalMortes = 0;
    this.totalAssistencias = 0;
    this.ama_medio = 0;


    this.totalPartidas = this.partidasFiltradas.length;

    this.totalVitorias = this.partidasFiltradas.filter(p => p.resultado == "Vitória").length;

    this.totalDerrotas = this.totalPartidas - this.totalVitorias;

    if (this.totalPartidas > 0) {
        this.winRate = this.totalVitorias/this.totalPartidas * 100;
    } else {
        this.winRate = 0;
    }

    for (const partida of this.partidasFiltradas){
        this.totalAbates += partida.abates;
        this.totalMortes += partida.mortes;
        this.totalAssistencias += partida.assistencias;
    }
    if (this.totalMortes != 0){
        this.ama_medio = (this.totalAbates + this.totalAssistencias) / this.totalMortes;
    }
    else {
        this.ama_medio = this.totalAbates + this.totalAssistencias;
    }

  }

  // Função para buscar do Python
  carregarPartidas() {
    this.apiService.listarPartidas().subscribe({
      next: (dados) => {
        this.partidas = dados; // Guarda os dados na variável
        this.partidasFiltradas = dados;
        this.calcularEstatisticas();
        console.log('Partidas carregadas:', dados);
      },
      error: (erro) => console.error('Erro ao buscar:', erro)
    });
  }

  filtrar(jogo: string){
    this.filtroAtual = jogo;

    if (jogo == "Todos"){
      this.partidasFiltradas = this.partidas;
    }
    else {
      this.partidasFiltradas = this.partidas.filter(p => p.jogo.toLowerCase().includes(jogo.toLowerCase()))
    }
    this.calcularEstatisticas()
  }
  // Função do botão "Salvar"
  salvar() {
    this.apiService.salvarPartida(this.novaPartida).subscribe({
      next: (partidaSalva) => {
        alert('Partida salva com sucesso!');
        this.partidas.push(partidaSalva); // Adiciona na lista visualmente na hora
        // Limpa o formulário
        this.novaPartida = { jogo: '', resultado: 'Vitória', abates: 0, mortes: 0, assistencias: 0 };
        this.calcularEstatisticas()
      },
      error: (erro) => console.error('Erro ao salvar:', erro)
    });
  }

  // Função do botão "Deletar"
  deletar(id?: number) {
    if (!id) return;
    
    if (confirm('Tem certeza que quer apagar essa partida?')) {
      this.apiService.deletarPartida(id).subscribe({
        next: () => {
          // Remove da lista visualmente (filtra quem tem ID diferente do apagado)
          this.partidas = this.partidas.filter(p => p.id !== id);
          this.filtrar(this.filtroAtual);
          this.calcularEstatisticas()
        },
        error: (erro) => console.error('Erro ao deletar:', erro)
      });
    }
  }
}