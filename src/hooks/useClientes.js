import { useState, useEffect } from 'react';
import {
  carregarClientes,
  salvarClientes,
} from '../services/clienteService';

export function useClientes() {
  const [clientes, setClientes] = useState(
    carregarClientes()
  );

  useEffect(() => {
    salvarClientes(clientes);
  }, [clientes]);

  const adicionar = (
    nome,
    email,
    telefone
  ) => {
    const novoCliente = {
      id: Date.now(),
      nome,
      email,
      telefone,
    };

    setClientes([
      ...clientes,
      novoCliente,
    ]);
  };

  const atualizar = (
    id,
    nome,
    email,
    telefone
  ) => {
    const atualizados = clientes.map(
      (cliente) =>
        cliente.id === id
          ? {
              ...cliente,
              nome,
              email,
              telefone,
            }
          : cliente
    );

    setClientes(atualizados);
  };

  const remover = (id) => {
    const filtrados = clientes.filter(
      (cliente) => cliente.id !== id
    );

    setClientes(filtrados);
  };

  return {
    clientes,
    adicionar,
    atualizar,
    remover,
  };
}