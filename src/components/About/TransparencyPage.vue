<template>
  <div class="page transparencyPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">
        Transparencia.
      </h1>
    </div>
    <div class="pageRow">
      <div class="pageLeft">
        <p>
          La Corporación Chilena de Video trabaja sobre el desarrollo de
          actividades y programas que abordan la relación del arte, la ciencia,
          la tecnología y la educación. Cuenta con el apoyo de diversos aliados
          y socios, y se financia principalmente a través de los siguientes
          programas:
        </p>
        <p>
          Programa de festivales de trayectoria del Fondo del Arte y la
          Industria Audiovisual, convocatoria 2019 - 2020.
        </p>
        <p>
          Programa Otras Instituciones Colaboradoras 2019, del Ministerio de las
          Culturas, el Arte y el Patrimonio.
        </p>
        <p>
          Ley de Donaciones Culturales, Proyecto 14 Bienal de Artes Mediales
        </p>
      </div>
      <div class="pageRight">
        <Loader :loading="isLoading" />
        <ul v-if="!isLoading">
          <li
            class="transparencyDocument"
            v-for="doc in documents"
            v-bind:key="doc.id"
          >
            <a :title="`Descargar ${doc.name}`" :href="doc.url"
              >{{ doc.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useDouseDocuments from "@/factories/useDocuments";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "TransparencyPage",
  components: { Loader },
  setup() {
    const { isLoading, documents, fetchDocuments } = useDouseDocuments();

    fetchDocuments();
    return { documents, isLoading };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.transparencyPage
  .pageLeft
    margin-right: 20px;
    text-align: justify;

  .pageRight
    position: relative;
    margin-left: 20px;

  .transparencyDocument
    padding: 0 0 1em 0;

    a
      text-transform: uppercase;
      font-size: 20px;
      font-family: Montserrat;

      &:hover
        color: darken($blue, 10);
</style>
