package appmoove_BackEnd.main;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import appmoove_BackEnd.GUI.PetsGUI;
import appmoove_BackEnd.DAOs.PetsDAO;
import appmoove_BackEnd.Entidade.Pets;
import org.springframework.data.domain.*;

// Gerar relatório de cobertura Execute:
// bash mvn clean test O relatório HTML ficará em 
// target/site/jacoco/index.html e falhará se a cobertura for<60%
// -->   mvn clean test

class PetControllerTest {

    // @Autowired
    // private MockMvc mockMvc;

    // @Test
    // void listarPets_deveRetornar200ELista() throws Exception {
    // mockMvc.perform(get("/")
    // .param("size", "5"))
    // .andExpect(status().isOk())
    // .andExpect(jsonPath("$.content").isArray());
    // }

    private MockMvc mockMvc;

    @Mock
    private PetsDAO petsDAO;

    @InjectMocks
    private PetsGUI petsGUI;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        // monta um MockMvc que só conhece o seu controller
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(petsGUI)
                .build();
    }

    @Test
    void listarPets_deveRetornar200ELista() throws Exception {
        // dado um pet de exemplo
        Pets exemplo = new Pets();
        exemplo.setId(UUID.randomUUID());
        exemplo.setName("Rex");
        exemplo.setSpecies("dog");
        exemplo.setBreed("Labrador");
        exemplo.setAgeYears(3);
        exemplo.setShelterCity("São Paulo");
        exemplo.setShelterLat(BigDecimal.valueOf(-23.550520));
        exemplo.setShelterLng(BigDecimal.valueOf(-46.633308));
        exemplo.setStatus("available");

        // cria uma página fake contendo esse pet
        List<Pets> lista = Collections.singletonList(exemplo);
        Page<Pets> page = new PageImpl<>(
                lista,
                PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt")),
                lista.size());

        // quando dao.findAll(...) for chamado, retorna essa página
        when(petsDAO.findAll((org.springframework.data.jpa.domain.Specification<Pets>) any(), any(Pageable.class)))
                .thenReturn(page);

        // faz GET /pets?size=5 e valida JSON
        mockMvc.perform(get("/pets")
                .param("size", "5")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content[0].name").value("Rex"))
                .andExpect(jsonPath("$.total").value(1))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(5));
    }

    @Test
    void getById_quandoNaoExiste_deveRetornar404() throws Exception {
        UUID inexistente = UUID.randomUUID();
        // dao retorna vazio
        when(petsDAO.findById(inexistente)).thenReturn(Optional.empty());

        mockMvc.perform(get("/pets/{id}", inexistente)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void getById_quandoExiste_retornarPet() throws Exception {
        UUID existente = UUID.randomUUID();
        Pets exemplo = new Pets();
        exemplo.setId(existente);
        exemplo.setName("Mimi");
        exemplo.setSpecies("cat");
        exemplo.setBreed("Siamese");
        exemplo.setAgeYears(2);
        exemplo.setShelterCity("Rio de Janeiro");
        exemplo.setShelterLat(BigDecimal.valueOf(-22.906847));
        exemplo.setShelterLng(BigDecimal.valueOf(-43.172896));
        exemplo.setStatus("available");

        when(petsDAO.findById(existente)).thenReturn(Optional.of(exemplo));

        mockMvc.perform(get("/pets/{id}", existente)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(existente.toString()))
                .andExpect(jsonPath("$.name").value("Mimi"))
                .andExpect(jsonPath("$.species").value("cat"));
    }
}