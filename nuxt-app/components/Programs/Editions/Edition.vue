<template>
  <div class="edition">
    <div class="editionLeft">
      <div
        class="editionInfo"
        v-bind:class="{ 'editionInfo--expanded': isOpen }"
      >
        <!-- Name when url is no defined-->
        <h1 class="editionName" v-if="onBigScreen && !edition.url">
          {{ edition.name }}
        </h1>

        <!-- Link is displayed when url is defined-->
        <h1
          class="editionName editionName--with-link"
          v-if="onBigScreen && edition.url"
        >
          <a :href="edition.url" title="Ir a la web" target="_blank">{{
            edition.name
          }}</a>
        </h1>

        <p class="editionDate" v-if="edition.date && onBigScreen">
          {{ edition.date }}
        </p>

        <div
          v-if="!!edition.brochure_url && onBigScreen"
          class="editionBrochure"
        >
          <a
            class="editionBrochureLink"
            target="_blank"
            title="Ver el catálogo"
            :href="edition.brochure_url"
            >Ver catálogo
            <v-icon :color="MAIN_COLOR" scale="0.9" name="external-link-alt">
            </v-icon
          ></a>
        </div>

        <div
          v-if="onBigScreen"
          class="pageBody editionText"
          v-html="edition.text"
        ></div>

        <!-- Small viewports elements -->
        <!-- Name on mobile views -->
        <h1
          v-if="!onBigScreen"
          title="Ver descripción"
          class="editionName"
          @click="toggleIsOpen"
        >
          {{ edition.name }}
          <v-icon v-if="!isOpen" name="chevron-down"> </v-icon>
          <v-icon v-else name="chevron-up"> </v-icon>
        </h1>

        <!-- Available on mobile views, collapsable section with the content of each edition -->
        <collapse-transition>
          <div v-show="!onBigScreen && isOpen">
            <p class="editionDate" v-if="edition.date">
              {{ edition.date }}
            </p>
            <div v-if="!!edition.brochure_url" class="editionBrochure">
              <a
                class="editionBrochureLink"
                target="_blank"
                title="Ver el catálogo"
                :href="edition.brochure_url"
                >Ver catálogo
                <v-icon
                  :color="MAIN_COLOR"
                  :scale="0.8"
                  name="external-link-alt"
                >
                </v-icon
              ></a>
            </div>
            <div class="pageBody" v-html="edition.text"></div>
          </div>
        </collapse-transition>
      </div>

      <button
        @click="toggleIsOpen"
        :title="`${isOpen ? 'Cerrar' : 'Expandir'} Texto`"
        class="toggleEditionTextButton"
      >
        <v-icon v-if="!isOpen" :color="MAIN_COLOR" name="chevron-down">
        </v-icon>
        <v-icon v-else :color="MAIN_COLOR" name="chevron-up"> </v-icon>
      </button>
    </div>
    <div class="editionMedia">
      <Media
        :height="mediaHeight"
        :gallery="edition.gallery"
        :youtubeUrl="edition.video_url"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./edition.ts"></script>
