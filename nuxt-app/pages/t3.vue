<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        test3
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from "@nuxtjs/composition-api";
import Vue from "vue";

export default defineComponent({
  name: "testPage3",
  head: {},
  setup() {
    useMeta(() => ({
      title: "Articles focused on learning Laravel and VueJS",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "La Corporación Chilena de Video y Artes Electrónicas (CChV) se fundó en 1993 bajo la dirección del videoartista, académico y teórico Néstor Olhagaray (1946 – 2020). Su creación respondió a la necesidad de dar continuidad al legado del Festival Franco-Chileno de Videoarte, un hito para la difusión y desarrollo de las artes mediales en Chile que, con el apoyo de la Embajada de Francia, ofrecía a los artistas nacionales un espacio de libertad creativa y una posibilidad de diálogo con otros creadores y realizadores franceses.\n\nCon la llegada de la democracia, algunos artistas que habían integrado la Sociedad Chilena de Video -entre ellos Olhagaray-, decidieron fundar la Corporación Chilena de Video, desde donde inauguraron la Primera Bienal de Video del país, como un nuevo espacio de exhibición que permitiera la difusión de obras de artistas nacionales e internacionales.\n\nA partir de entonces, la CChV se ha dedicado a impulsar a través de distintos programas y proyectos -la Bienal de Artes Mediales de Santiago, el Concurso Internacional Juan Downey, la Escuela de la Intuición y Mediateca Libre, entre otros- la formación, investigación, producción y difusión de las artes mediales en el país, así como también a fomentar la unión entre arte y ciencia, basada en un intercambio cultural entre Chile y otros países.\n\nHoy, con casi 30 años de funcionamiento, es uno de las principales organismos nacionales que, de manera sistemática y sostenida, ha ofrecido una vitrina para prácticas análogas y digitales, constituyéndose en un referente para comprender la evolución de las artes mediales en Chile, así como también para percibir la forma en que nuevas generaciones se abren a distintas convergencias disciplinares entre las artes y las ciencias.\n\n"
        },
        {
          property: "og:site_name",
          content: "CChvV site name"
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website"
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://bobross.com"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Historia"
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "\n\nLa Corporación Chilena de Video y Artes Electrónicas (CChV) se fundó en 1993 bajo la dirección del videoartista, académico y teórico Néstor Olhagaray (1946 – 2020). Su creación respondió a la necesidad de dar continuidad al legado del Festival Franco-Chileno de Videoarte, un hito para la difusión y desarrollo de las artes mediales en Chile que, con el apoyo de la Embajada de Francia, ofrecía a los artistas nacionales un espacio de libertad creativa y una posibilidad de diálogo con otros creadores y realizadores franceses.\n\nCon la llegada de la democracia, algunos artistas que habían integrado la Sociedad Chilena de Video -entre ellos Olhagaray-, decidieron fundar la Corporación Chilena de Video, desde donde inauguraron la Primera Bienal de Video del país, como un nuevo espacio de exhibición que permitiera la difusión de obras de artistas nacionales e internacionales.\n\nA partir de entonces, la CChV se ha dedicado a impulsar a través de distintos programas y proyectos -la Bienal de Artes Mediales de Santiago, el Concurso Internacional Juan Downey, la Escuela de la Intuición y Mediateca Libre, entre otros- la formación, investigación, producción y difusión de las artes mediales en el país, así como también a fomentar la unión entre arte y ciencia, basada en un intercambio cultural entre Chile y otros países.\n\nHoy, con casi 30 años de funcionamiento, es uno de las principales organismos nacionales que, de manera sistemática y sostenida, ha ofrecido una vitrina para prácticas análogas y digitales, constituyéndose en un referente para comprender la evolución de las artes mediales en Chile, así como también para percibir la forma en que nuevas generaciones se abren a distintas convergencias disciplinares entre las artes y las ciencias.\n\n"
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://cchv.cl/futuro/wp-content/uploads/2020/06/catalogo_i.jpg"
        },
        {
          property: "og:image:width",
          content: "740"
        },
        {
          property: "og:image:height",
          content: "300"
        },
        {
          name: "twitter:site",
          content: "@cchv"
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: "https://bobross.com"
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Historia"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "\n\nLa Corporación Chilena de Video y Artes Electrónicas (CChV) se fundó en 1993 bajo la dirección del videoartista, académico y teórico Néstor Olhagaray (1946 – 2020). Su creación respondió a la necesidad de dar continuidad al legado del Festival Franco-Chileno de Videoarte, un hito para la difusión y desarrollo de las artes mediales en Chile que, con el apoyo de la Embajada de Francia, ofrecía a los artistas nacionales un espacio de libertad creativa y una posibilidad de diálogo con otros creadores y realizadores franceses.\n\nCon la llegada de la democracia, algunos artistas que habían integrado la Sociedad Chilena de Video -entre ellos Olhagaray-, decidieron fundar la Corporación Chilena de Video, desde donde inauguraron la Primera Bienal de Video del país, como un nuevo espacio de exhibición que permitiera la difusión de obras de artistas nacionales e internacionales.\n\nA partir de entonces, la CChV se ha dedicado a impulsar a través de distintos programas y proyectos -la Bienal de Artes Mediales de Santiago, el Concurso Internacional Juan Downey, la Escuela de la Intuición y Mediateca Libre, entre otros- la formación, investigación, producción y difusión de las artes mediales en el país, así como también a fomentar la unión entre arte y ciencia, basada en un intercambio cultural entre Chile y otros países.\n\nHoy, con casi 30 años de funcionamiento, es uno de las principales organismos nacionales que, de manera sistemática y sostenida, ha ofrecido una vitrina para prácticas análogas y digitales, constituyéndose en un referente para comprender la evolución de las artes mediales en Chile, así como también para percibir la forma en que nuevas generaciones se abren a distintas convergencias disciplinares entre las artes y las ciencias.\n\n"
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content:
            "https://cchv.cl/futuro/wp-content/uploads/2020/06/catalogo_i.jpg"
        }
      ]
    }));
  }
});
</script>

<style></style>
