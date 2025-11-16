import { Component } from '@angular/core';

@Component({
  selector: 'app-line-session',
  imports: [],
  templateUrl: './line-session.html',
  styleUrl: './line-session.css'
})
export class LineSession {
  // Categoria atualmente ativa
  activeCategory: string = '';

  /**
   * Define a categoria ativa
   * @param category - Nome da categoria ('feminino', 'masculino', 'marcas')
   */
  setActiveCategory(category: string): void {
    // Se clicar na categoria já ativa, desativa
    if (this.activeCategory === category) {
      this.activeCategory = '';
    } else {
      this.activeCategory = category;
    }

    // Aqui você pode adicionar lógica adicional, como:
    // - Emitir evento para componente pai
    // - Navegar para rota específica
    // - Filtrar produtos
    console.log('Categoria selecionada:', this.activeCategory);
  }
}
