import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fruit } from './fruit';
import { FruitService } from './fruit.service';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly fruitService = inject(FruitService);
  protected readonly fruits = signal<Fruit[]>([]);
  protected readonly selectedFruit = signal<Fruit | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly isSearching = signal(false);
  protected readonly errorMessage = signal('');
  protected searchTerm = '';

  ngOnInit(): void {
    this.loadFruits();
  }

  protected loadFruits(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.fruitService.getAll().subscribe({
      next: (fruits) => { this.fruits.set(fruits); this.isLoading.set(false); },
      error: () => { this.errorMessage.set('Non riesco a caricare i frutti. Riprova tra poco.'); this.isLoading.set(false); },
    });
  }

  protected showDetails(fruit: Fruit): void {
    this.selectedFruit.set(fruit);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected closeDetails(): void { this.selectedFruit.set(null); }

  protected search(): void {
    const term = this.searchTerm.trim();
    if (!term) { this.resetSearch(); return; }
    this.isSearching.set(true);
    this.errorMessage.set('');
    this.fruitService.searchByName(term).subscribe({
      next: (fruit) => { this.fruits.set([fruit]); this.selectedFruit.set(fruit); this.isSearching.set(false); },
      error: () => { this.fruits.set([]); this.selectedFruit.set(null); this.errorMessage.set(`Non ho trovato un frutto chiamato "${term}".`); this.isSearching.set(false); },
    });
  }

  protected resetSearch(): void {
    this.searchTerm = '';
    this.closeDetails();
    this.loadFruits();
  }

  protected fruitEmoji(name: string): string {
    const emojis: Record<string, string> = {
      apple: '🍎', banana: '🍌', orange: '🍊', pear: '🍐', strawberry: '🍓', mango: '🥭',
      pineapple: '🍍', watermelon: '🍉', kiwi: '🥝', lemon: '🍋', lime: '🍋', peach: '🍑',
      cherry: '🍒', grape: '🍇', coconut: '🥥', papaya: '🧡', blueberry: '🫐', avocado: '🥑',
    };
    return emojis[name.toLowerCase()] ?? '🍏';
  }
}
