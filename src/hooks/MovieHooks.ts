// MovieVM.ts
import { useEffect, useState } from 'react';
import { MovieVM } from '../viewModels/MovieVM';
import { IMovie } from '../models/IMovie';

export const useMovieViewModel = (viewModel: MovieVM) => {
    const [items, setItems] = useState<IMovie[]>(viewModel.getItems());

    useEffect(() => {
        // Nos suscribimos a los cambios del ViewModel
        const unsubscribe = viewModel.subscribe(() => {
            setItems(viewModel.getItems());
        });

        // Al desmontar el componente, nos desuscribimos
        return () => unsubscribe();
    }, [viewModel]);

    return {
        items,
        addItem: (newItem: IMovie) => viewModel.addItem(newItem),
        removeItem: (index: number) => viewModel.removeItem(index),
    };
};
