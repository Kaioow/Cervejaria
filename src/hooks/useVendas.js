import { useState, useEffect } from 'react';

import {
  carregarVendas,
  salvarVendas,
  carregarClientes,
  carregarCervejas,
} from '../services/vendaService';

export function useVendas() {
  const [vendas, setVendas] = useState(carregarVendas());

  const [clientes, setClientes] = useState([]);
  const [cervejas, setCervejas] = useState([]);

  const [clienteId, setClienteId] =
    useState('');

  const [cervejaId, setCervejaId] =
    useState('');

  const [quantidade, setQuantidade] =
    useState('');

  const [editandoId, setEditandoId] =
    useState(null);

  useEffect(() => {
    salvarVendas(vendas);
  }, [vendas]);

  useEffect(() => {
    setClientes(
      carregarClientes()
    );

    setCervejas(
      carregarCervejas()
    );
  }, []);

  const limparFormulario = () => {
    setClienteId('');
    setCervejaId('');
    setQuantidade('');
    setEditandoId(null);
  };

  const salvarVenda = (e) => {
    e.preventDefault();

    if (
      !clienteId ||
      !cervejaId ||
      !quantidade 
    ) {
      alert(
        'Preencha todos os campos.'
      );
      return;
    }

    //prucura e calcula o valor total do pedido com base nas cervejas
    const cervejaSelecionada = cervejas.find((c) => c.id === Number(cervejaId));
    const valorCalculado = Number(cervejaSelecionada.valor) * Number(quantidade);


    if (editandoId) {
      setVendas(
        vendas.map((venda) =>
          venda.id === editandoId
            ? {
                ...venda,
                clienteId:
                  Number(clienteId),
                cervejaId:
                  Number(cervejaId),
                quantidade:
                  Number(quantidade),
                valorTotal:
                 valorCalculado,
              }
            : venda
        )
      );
    } else {
      const novaVenda = {
        id: Date.now(),
        clienteId:
          Number(clienteId),
        cervejaId:
          Number(cervejaId),
        quantidade:
          Number(quantidade),
        valorTotal:
          valorCalculado,
      };

      setVendas([
        ...vendas,
        novaVenda,
      ]);
    }

    limparFormulario();
  };


  
  const editarVenda = (venda) => {
    setClienteId(venda.clienteId);
    setCervejaId(venda.cervejaId);
    setQuantidade(venda.quantidade);
    setValorTotal(venda.valorTotal);
    setEditandoId(venda.id);
  };

  const excluirVenda = (id) => {
    if (
      !window.confirm(
        'Deseja excluir esta venda?'
      )
    ) {
      return;
    }

    setVendas(
      vendas.filter(
        (venda) => venda.id !== id
      )
    );
  };

  const faturamentoTotal =
    vendas.reduce(
      (total, venda) =>
        total + venda.valorTotal,
      0
    );

  return {
    vendas,
    clientes,
    cervejas,

    clienteId,
    setClienteId,

    cervejaId,
    setCervejaId,

    quantidade,
    setQuantidade,


    editandoId,

    salvarVenda,
    editarVenda,
    excluirVenda,

    faturamentoTotal,
  };
}