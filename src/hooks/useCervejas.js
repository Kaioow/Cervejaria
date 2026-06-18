import { useState, useEffect } from 'react';
import {
  carregarCervejas,
  salvarCervejas,
} from '../services/cervejaService';

export function useCervejas() {
  const [cervejas, setCervejas] = useState(carregarCervejas() );

  useEffect(() => {
    salvarCervejas(cervejas);
  }, [cervejas]);

  const adicionar = (nome, estilo) => {
    const novaCerveja = {
      id: Date.now(),
      nome,
      estilo,
    };

    setCervejas([
      ...cervejas,
      novaCerveja,
    ]);
  };

  const atualizar = (
    id,
    nome,
    estilo
  ) => {
    const atualizadas = cervejas.map(
      (cerveja) =>
        cerveja.id === id
          ? {
              ...cerveja,
              nome,
              estilo,
            }
          : cerveja
    );

    setCervejas(atualizadas);
  };

  const remover = (id) => {
    const filtradas = cervejas.filter(
      (cerveja) => cerveja.id !== id
    );

    setCervejas(filtradas);
  };

  return {
    cervejas,
    adicionar,
    atualizar,
    remover,
  };
}