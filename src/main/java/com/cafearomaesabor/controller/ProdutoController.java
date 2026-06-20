package com.cafearomaesabor.controller;

import com.cafearomaesabor.model.Produto;
import com.cafearomaesabor.repository.ProdutoRepository;
import com.cafearomaesabor.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoService produtoService;

    @Autowired
    private ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public String listarProdutos(@RequestParam(required = false) String busca,
                                 Model model) {
        List<Produto> produtos;
        if (busca != null && !busca.isEmpty()) {
            produtos = produtoRepository.findByNomeContainingIgnoreCase(busca);
            model.addAttribute("busca", busca);
        } else {
            produtos = produtoRepository.findAll();
        }
        model.addAttribute("produtos", produtos);
        return "produto/listagem";
    }

    @GetMapping("/cadastrar")
    public String formInserirProduto(Model model) {
        model.addAttribute("produto", new Produto());
        model.addAttribute("acao", "Novo Produto");
        model.addAttribute("botaoSalvar", "Salvar Produto");
        return "produto/form-inserir";
    }

    @PostMapping("/salvar")
    public String salvarProduto(@Valid @ModelAttribute Produto produto,
                                BindingResult result,
                                Model model) {
        if (result.hasErrors()) {
            model.addAttribute("acao", "Novo Produto");
            model.addAttribute("botaoSalvar", "Salvar Produto");
            return "produto/form-inserir";
        }
        produtoService.salvar(produto);
        return "redirect:/produto";
    }

    @GetMapping("/editar/{id}")
    public String formEditarProduto(@PathVariable Long id,
                                    Model model) {
        Produto produto = produtoService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        model.addAttribute("produto", produto);
        model.addAttribute("acao", "Editar Produto");
        model.addAttribute("botaoSalvar", "Atualizar Produto");
        return "produto/form-inserir";
    }

    @PostMapping("/atualizar/{id}")
    public String atualizarProduto(@PathVariable Long id,
                                   @Valid @ModelAttribute Produto produtoAtualizado,
                                   BindingResult result,
                                   Model model) {
        if (result.hasErrors()) {
            model.addAttribute("acao", "Editar Produto");
            model.addAttribute("botaoSalvar", "Atualizar Produto");
            return "produto/form-inserir";
        }
        produtoService.atualizar(id, produtoAtualizado);
        return "redirect:/produto";
    }

    @GetMapping("/excluir/{id}")
    public String excluirProduto(@PathVariable Long id) {
        produtoService.excluir(id);
        return "redirect:/produto";
    }

}
