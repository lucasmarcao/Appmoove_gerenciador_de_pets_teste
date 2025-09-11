package appmoove_BackEnd.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
// import org.springframework.boot.autoconfigure.domain.EntityScan;
// import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(
		// Somente estes pacotes terão @Component, @Controller, @Service etc.
		scanBasePackages = {
				"appmoove_BackEnd.GUI",
				"appmoove_BackEnd.DAOs",
				"appmoove_BackEnd.Entidade",
				"appmoove_BackEnd.Config",
				"appmoove_BackEnd.main"
		})
@EnableJpaRepositories(
		// Somente neste pacote o Spring Data JPA procura interfaces JpaRepository
		basePackages = "appmoove_BackEnd.DAOs")
@EntityScan(
		// Somente neste pacote o JPA procura @Entity
		basePackages = "appmoove_BackEnd.Entidade")
@RestController
public class MainApplication {
	// pra rodar, na pasta projectAPI/BackEnd:
	// vai no arquivo RodarPorTerminal.txt e copia.

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
		// run serve pro RestController funcionar no MainAplication.
		System.out.println("\n A Rede Social Backend está rodando! \n em http://localhost:8087");

	}

	// http://localhost:8087 porta 8087
	@GetMapping({ "", "/" })
	public String indexApp() {
		String obrigado = """
				<h1> Desafio Técnico Estágio — AdoteUmPet </h1>
				<h3>
				Objetivo:
				Construir uma aplicação completa para gerenciar pets para adoção e consultar
				informações de raças.
				</h3>
				<hr>
				<p>
				Backend: API REST em qualquer linguagem (Node, Python, Go, Java, .NET, etc.),
				com MySQL ou PostgreSQL.
				Frontend: React ou VueJS.
				</p>

				""";
		return obrigado;
	}

	@GetMapping({ "/marcao", "/marcao/" })
	public String marcao(@RequestParam(defaultValue = "Marcão") String name) {
		//
		return String.format("Hello %s!", name);
	}

}
