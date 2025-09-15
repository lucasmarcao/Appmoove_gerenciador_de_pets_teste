package appmoove_BackEnd.main;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.boot.autoconfigure.domain.EntityScan;
// import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import appmoove_BackEnd.DTOs.BreedDTO;

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

	private final RestTemplate restTemplate = new RestTemplate();

	// Suas chaves API

	@Value("${minha.aplicacao.api-key-dog}")
	private static String DOG_API_KEY;

	@Value("${minha.aplicacao.api-key-cat}")
	private static String CAT_API_KEY;

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

				<hr>
				<h4>
				Acesso ao swagger:
				http://localhost:8087/swagger-ui/index.html
				</h4>

				""";
		return obrigado;
	}

	// marcao exemplo urls api (eu deixei aqui pra vc ver e usar mesmo)
	// sem precisar ter que fazer a propria.
	// link dog -> http://localhost:8087/breeds/dog/?name=Airedale+Terrier
	// link cat -> http://localhost:8087/breeds/cat/?name=Birman
	// listar todos { javanese gatin }
	// cat -> https://api.thecatapi.com/v1/breeds/
	// dog -> https://api.thedogapi.com/v1/breeds/
	// imagem aleatoria
	// do gato -> https://cdn2.thecatapi.com/images/xoI_EpOKe.jpg

	// jeito antigo de filtrar breeds :::
	// @GetMapping({ "/breeds/{species}", "/breeds/{species}/" })
	// public ResponseEntity<?> getBreedsBySpecies(
	// @PathVariable String species,
	// @RequestParam(required = false) String name) {

	// try {
	// if (!species.equalsIgnoreCase("dog") && !species.equalsIgnoreCase("cat")) {
	// return ResponseEntity
	// .status(HttpStatus.BAD_REQUEST)
	// .body("Espécie inválida. Use 'dog' ou 'cat'.");
	// }

	// List<BreedDTO> breeds;

	// if (species.equalsIgnoreCase("dog")) {
	// breeds = getDogBreeds(name);
	// } else {
	// breeds = getCatBreeds(name);
	// }

	// if (breeds.isEmpty()) {
	// return ResponseEntity
	// .status(HttpStatus.NOT_FOUND)
	// .body("Nenhuma raça encontrada para o nome: " + name);
	// }

	// return ResponseEntity.ok(breeds);
	// } catch (Exception e) {
	// return ResponseEntity
	// .status(HttpStatus.INTERNAL_SERVER_ERROR)
	// .body("Erro ao buscar raças: " + e.getMessage());
	// }
	// }

	@GetMapping({ "/breeds/{species}", "/breeds/{species}/" })
	public ResponseEntity<?> getBreedsBySpecies(
			@PathVariable String species,
			@RequestParam(required = false) String name,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		try {
			if (!species.equalsIgnoreCase("dog") && !species.equalsIgnoreCase("cat")) {
				return ResponseEntity
						.status(HttpStatus.BAD_REQUEST)
						.body("Espécie inválida. Use 'dog' ou 'cat'.");
			}

			List<BreedDTO> breeds;

			if (species.equalsIgnoreCase("dog")) {
				breeds = getDogBreeds(name);
			} else {
				breeds = getCatBreeds(name);
			}

			if (breeds.isEmpty()) {
				return ResponseEntity
						.status(HttpStatus.NOT_FOUND)
						.body("Nenhuma raça encontrada para o nome: " + name);
			}

			// Implementar paginação manual
			int total = breeds.size();
			int start = Math.min(page * size, total);
			int end = Math.min((page + 1) * size, total);

			List<BreedDTO> pageContent = breeds.subList(start, end);

			// Criar resposta paginada
			Map<String, Object> response = new HashMap<>();
			response.put("total", total);
			response.put("page", page);
			response.put("size", size);
			response.put("content", pageContent);

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao buscar raças: " + e.getMessage());
		}
	}

	private List<BreedDTO> getDogBreeds(String name) {
		String url = "https://api.thedogapi.com/v1/breeds/search?q=" + name;

		HttpHeaders headers = new HttpHeaders();
		headers.set("x-api-key", DOG_API_KEY);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		try {
			// Usando ParameterizedTypeReference para preservar a informação de tipo
			ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
					url, HttpMethod.GET, entity, new ParameterizedTypeReference<List<Map<String, Object>>>() {
					});

			List<Map<String, Object>> breedsData = response.getBody();

			if (breedsData == null || breedsData.isEmpty()) {
				return List.of();
			}

			return breedsData.stream()
					.map(breed -> {
						String breedName = (String) breed.get("name");
						String origin = (String) breed.get("origin");
						String life_span = (String) breed.get("life_span");
						String temperament = (String) breed.get("temperament");

						// Buscar imagem de referência
						String imageUrl = getDogImage((String) breed.get("reference_image_id"));

						return new BreedDTO(breedName, origin, life_span, temperament, imageUrl);
					})
					.toList();
		} catch (Exception e) {
			// Log do erro (opcional)
			System.err.println("Erro ao buscar raças de cachorros: " + e.getMessage());
			return List.of();
		}
	}

	private List<BreedDTO> getCatBreeds(String name) {
		String url = "https://api.thecatapi.com/v1/breeds/search?q=" + name;

		HttpHeaders headers = new HttpHeaders();
		headers.set("x-api-key", CAT_API_KEY);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		try {
			// Usando ParameterizedTypeReference para preservar a informação de tipo
			ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
					url, HttpMethod.GET, entity, new ParameterizedTypeReference<List<Map<String, Object>>>() {
					});

			List<Map<String, Object>> breedsData = response.getBody();

			if (breedsData == null || breedsData.isEmpty()) {
				return List.of();
			}

			return breedsData.stream()
					.map(breed -> {
						String breedName = (String) breed.get("name");
						String origin = (String) breed.get("origin");
						String life_span = (String) breed.get("life_span");
						String temperament = (String) breed.get("temperament");

						// Buscar imagem de referência
						String imageUrl = getCatImage((String) breed.get("reference_image_id"));

						return new BreedDTO(breedName, origin, life_span, temperament, imageUrl);
					})
					.toList();
		} catch (Exception e) {
			// Log do erro (opcional)
			System.err.println("Erro ao buscar raças de gato: " + e.getMessage());
			return List.of();
		}
	}

	private String getDogImage(String referenceImageId) {
		if (referenceImageId == null)
			return null;

		String url = "https://api.thedogapi.com/v1/images/" + referenceImageId;

		HttpHeaders headers = new HttpHeaders();
		headers.set("x-api-key", DOG_API_KEY);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		try {
			// ResponseEntity<Map> response = restTemplate.exchange(
			// url, HttpMethod.GET, entity, Map.class);

			ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
					url, HttpMethod.GET, entity, new ParameterizedTypeReference<Map<String, Object>>() {
					});

			Map<String, Object> imageData = response.getBody();
			return (String) imageData.get("url");
		} catch (Exception e) {
			return null;
		}
	}

	private String getCatImage(String referenceImageId) {
		if (referenceImageId == null)
			return null;

		String url = "https://api.thecatapi.com/v1/images/" + referenceImageId;

		HttpHeaders headers = new HttpHeaders();
		headers.set("x-api-key", CAT_API_KEY);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		try {
			// ResponseEntity<Map> response = restTemplate.exchange(
			// url, HttpMethod.GET, entity, Map.class);

			ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
					url, HttpMethod.GET, entity, new ParameterizedTypeReference<Map<String, Object>>() {
					});

			Map<String, Object> imageData = response.getBody();
			return (String) imageData.get("url");
		} catch (Exception e) {
			return null;
		}
	}

	/*
	 * GET /breeds/:species Integração com TheDogAPI (dog) ou TheCatAPI (cat).
	 * por nome. Normalizar a resposta para { name, origin
	 * energy_level, image_url } .
	 * 
	 * https://docs.thedogapi.com/docs/examples/images
	 * 
	 * https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN
	 * -ReBkp
	 * 
	 * 
	 * Search images: dog cachorro
	 * curl -H "x-api-key: YOUR-API-KEY"
	 * "https://api.thedogapi.com/v1/images/search?limit=2"
	 * 
	 * 
	 * Example of how to filter Images by Breed: cat gato
	 * endpoint: ./breeds
	 * e.g. https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}
	 * 
	 * lucas2004marcao@gmail.com
	 * App description:
	 * Desafio empresa appmoove
	 * 
	 * // marcao exemplo urls api (eu deixei aqui pra vc ver e usar mesmo)
	 * // sem precisar ter que fazer a propria.
	 * Minha API PRO GATO: ->Here's your API key:
	 * live_cn9U3MpBSnW3JQmDPIFL48UiMUO1MLKGb8FOJCbli0oD59QW0Qu9OxMzRA05nD9l
	 * 
	 * Minha API PRO CACHORRO: -> Here's your API key:
	 * live_kxfKAYcWTviLVSWSPYP6iGcw5ltIbOGfaZfHESPpxK6PalKptTRnmzp6H8zlauxP
	 * 
	 * 
	 * dog exe
	 * 
	 */

	// marcao fim
	@GetMapping({ "/marcao", "/marcao/" })
	public String marcao(@RequestParam(defaultValue = "Marcão") String name) {
		//
		return String.format("Hello %s!", name);
	}

}
