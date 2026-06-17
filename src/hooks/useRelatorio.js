import { useState, useEffect } from 'react';

import {
  gerarRelatorio,
} from '../services/relatorioService';

export function useRelatorio() {
  const [dadosRelatorio,
    setDadosRelatorio] = useState([]);

  useEffect(() => {
    setDadosRelatorio(
      gerarRelatorio()
    );
  }, []);

  const totalVendas =
    dadosRelatorio.length;

  const faturamentoTotal =
    dadosRelatorio.reduce(
      (total, venda) =>
        total + venda.valorTotal,
      0
    );

  return {
    dadosRelatorio,
    totalVendas,
    faturamentoTotal,
  };
}