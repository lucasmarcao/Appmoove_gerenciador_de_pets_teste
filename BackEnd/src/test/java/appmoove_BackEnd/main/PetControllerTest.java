package appmoove_BackEnd.main;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.test.web.servlet.MockMvc;

import appmoove_BackEnd.GUI.PetsGUI;

// Gerar relatório de cobertura Execute:

// bash mvn clean test O relatório HTML ficará em 
// target/site/jacoco/index.html e falhará se a cobertura for<60%
// -->   mvn clean test

@WebMvcTest(PetsGUI.class)
class PetControllerTest {

    // @Autowired
    // private MockMvc mockMvc;

    @Test
    void listarPets_deveRetornar200ELista() throws Exception {
        // mockMvc.perform(get("/")
        // .param("size", "5"))
        // .andExpect(status().isOk())
        // .andExpect(jsonPath("$.content").isArray());
    }
}