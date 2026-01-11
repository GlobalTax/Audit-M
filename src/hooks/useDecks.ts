import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type DeckGoal = 'corporate' | 'sales' | 'investor' | 'sector' | 'custom';
export type DeckStatus = 'draft' | 'ready' | 'exported';
export type SlideType = 'cover' | 'about' | 'services' | 'stats' | 'spain_setup' | 'cross_border' | 'proof_points' | 'process' | 'resources' | 'team' | 'differentiators' | 'engagement' | 'contact' | 'custom';

export interface Deck {
  id: string;
  name: string;
  brand_kit_id?: string | null;
  goal: DeckGoal;
  audience?: string | null;
  language: string;
  status: DeckStatus;
  outline_json?: Record<string, any> | null;
  pdf_url?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeckSlide {
  id: string;
  deck_id: string;
  slide_order: number;
  slide_type: SlideType;
  title?: string | null;
  content_json: Record<string, any>;
  speaker_notes?: string | null;
  created_at: string;
}

export const useDecks = (status?: DeckStatus) => {
  return useQuery({
    queryKey: ['decks', status],
    queryFn: async () => {
      let query = supabase
        .from('decks')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Deck[];
    },
  });
};

export const useDeck = (id: string) => {
  return useQuery({
    queryKey: ['deck', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Deck;
    },
    enabled: !!id,
  });
};

export const useDeckSlides = (deckId: string) => {
  return useQuery({
    queryKey: ['deck-slides', deckId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deck_slides')
        .select('*')
        .eq('deck_id', deckId)
        .order('slide_order');
      
      if (error) throw error;
      return data as DeckSlide[];
    },
    enabled: !!deckId,
  });
};

export const useCreateDeck = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (deck: Omit<Deck, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('decks')
        .insert(deck as any)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
  });
};

export const useUpdateDeck = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Deck> & { id: string }) => {
      const { data, error } = await supabase
        .from('decks')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
      queryClient.invalidateQueries({ queryKey: ['deck', variables.id] });
    },
  });
};

export const useDeleteDeck = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('decks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
  });
};

export const useCreateDeckSlide = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (slide: Omit<DeckSlide, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('deck_slides')
        .insert(slide as any)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deck-slides', variables.deck_id] });
    },
  });
};

export const useUpdateDeckSlide = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, deck_id, ...updates }: Partial<DeckSlide> & { id: string; deck_id: string }) => {
      const { data, error } = await supabase
        .from('deck_slides')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deck-slides', variables.deck_id] });
    },
  });
};

export const useDeleteDeckSlide = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, deck_id }: { id: string; deck_id: string }) => {
      const { error } = await supabase
        .from('deck_slides')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deck-slides', variables.deck_id] });
    },
  });
};

export const useReorderDeckSlides = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ deck_id, slides }: { deck_id: string; slides: { id: string; slide_order: number }[] }) => {
      const updates = slides.map(slide => 
        supabase
          .from('deck_slides')
          .update({ slide_order: slide.slide_order } as any)
          .eq('id', slide.id)
      );
      
      await Promise.all(updates);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deck-slides', variables.deck_id] });
    },
  });
};
