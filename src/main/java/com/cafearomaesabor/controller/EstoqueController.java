package com.cafearomaesabor.controller;

import com.cafearomaesabor.model.MovimentacaoEstoque;
import com.cafearomaesabor.model.Produto;
import com.cafearomaesabor.repository.MovimentacaoEstoqueRepository;
import com.cafearomaesabor.repository.ProdutoRepository;
import com.cafearomaesabor.service.EstoqueService;
import com.cafearomaesabor.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/estoque")
public class EstoqueController {

    private final EstoqueService estoqueService;
    private final ProdutoService produtoService;

    @Autowired
    private MovimentacaoEstoqueRepository movimentacaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public EstoqueController(EstoqueService estoqueService, ProdutoService produtoService) {
        this.estoqueService = estoqueService;
        this.produtoService = produtoService;
    }

    @GetMapping
    public String mostrarMovimentacao(Model model) {
        model.addAttribute("produtos", produtoRepository.findAll());
        model.addAttribute("movimentacao", new MovimentacaoEstoque());
        model.addAttribute("dataHoje", LocalDate.now());
        model.addAttribute("movimentacoes", movimentacaoRepository.findAllByOrderByDataDesc());
        return "estoque/movimentacao";
    }

    @PostMapping("/movimentacao")
    public String registrarMovimentacao(@ModelAttribute MovimentacaoEstoque movimentacao,
                                        @RequestParam Long produtoId,
                                        RedirectAttributes redirectAttributes) {
        try {
            Produto produto = produtoService.buscarPorId(produtoId)
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            movimentacao.setProduto(produto);
            estoqueService.registrarMovimentacao(movimentacao);
            redirectAttributes.addFlashAttribute("sucesso", "Movimentação registrada com sucesso!");
        } catch (RuntimeException e) {
            redirectAttributes.addFlashAttribute("erro", e.getMessage());
        }
        return "redirect:/estoque";
    }

}
