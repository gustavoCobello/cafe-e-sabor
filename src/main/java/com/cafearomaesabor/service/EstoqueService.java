package com.cafearomaesabor.service;

import com.cafearomaesabor.model.MovimentacaoEstoque;
import com.cafearomaesabor.model.Produto;
import com.cafearomaesabor.repository.MovimentacaoEstoqueRepository;
import com.cafearomaesabor.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EstoqueService {

    private final MovimentacaoEstoqueRepository movimentacaoRepository;
    private final ProdutoRepository produtoRepository;

    public EstoqueService(MovimentacaoEstoqueRepository movimentacaoRepository,
                          ProdutoRepository produtoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
        this.produtoRepository = produtoRepository;
    }

    @Transactional
    public MovimentacaoEstoque registrarMovimentacao(MovimentacaoEstoque movimentacao) {
        Produto produto = produtoRepository.findById(movimentacao.getProduto().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        if ("saida".equals(movimentacao.getTipo())) {
            if (movimentacao.getQuantidade() > produto.getQuantidade()) {
                throw new RuntimeException("Quantidade de saída maior que o estoque disponível (" + produto.getQuantidade() + ")");
            }
            produto.setQuantidade(produto.getQuantidade() - movimentacao.getQuantidade());
        } else if ("entrada".equals(movimentacao.getTipo())) {
            produto.setQuantidade(produto.getQuantidade() + movimentacao.getQuantidade());
        } else {
            throw new RuntimeException("Tipo de movimentação inválido");
        }

        produtoRepository.save(produto);
        return movimentacaoRepository.save(movimentacao);
    }

    public List<MovimentacaoEstoque> listarTodas() {
        return movimentacaoRepository.findAllByOrderByDataDesc();
    }

    public List<MovimentacaoEstoque> listarPorProduto(Long produtoId) {
        return movimentacaoRepository.findByProdutoIdOrderByDataDesc(produtoId);
    }

}
