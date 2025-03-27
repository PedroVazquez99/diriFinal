import { IMovie } from '../models/IMovie';
import { fetchItemsFromAPI, addItemToAPI, removeItemFromAPI } from '../services/MovieService';

export class MovieVM {
    private items: IMovie[] = [];
    private subscribers: Array<() => void> = [];

    constructor() {
        // Carga inicial de los ítems
        this.loadItems();
    }

    // CARGAR
    private async loadItems() {
        this.items = await fetchItemsFromAPI();
        this.notifyChange();
    }

    // OBTENER
    public getItems(): IMovie[] {
        return this.items;
    }

    // AGREGAR
    public async addItem(newItem: IMovie): Promise<void> {
        if (newItem) {
            this.items = await addItemToAPI(newItem);
            this.notifyChange();
        }
    }

    // ELIMINAR
    public async removeItem(index: number): Promise<void> {
        this.items = await removeItemFromAPI(index);
        this.notifyChange();
    }

    // Suscripción a cambios
    public subscribe(callback: () => void): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    // Se notifican los cambios a los suscriptores
    private notifyChange() {
        this.subscribers.forEach(cb => cb());
    }
}
