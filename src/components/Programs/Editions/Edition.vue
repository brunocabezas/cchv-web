<template>
  <div class="edition">
    <div class="editionInfo">
      <h1
        title="Ver descripción"
        class="editionName"
        v-if="!onBigScreen"
        @click="toggleIsOpen"
      >
        {{ edition.name }}
        <v-icon v-if="!isOpen" name="chevron-down"> </v-icon>
        <v-icon v-else name="chevron-up"> </v-icon>
      </h1>
      <h1 class="editionName" v-if="onBigScreen">
        {{ edition.name }}
      </h1>
      <p class="editionDate" v-if="edition.date && onBigScreen">
        {{ edition.date }}
      </p>
      <div>
        <collapse-transition>
          <div v-show="isOpen">
            <div class="pageBody" v-html="edition.text"></div>
            <div v-if="!!edition.brochure_url" class="editionBrochure">
              <a
                class="editionBrochureLink"
                target="_blank"
                title="Ver el catálogo"
                :href="edition.brochure_url"
                >Ver catálogo
                <v-icon :color="MAIN_COLOR" name="external-link-alt"> </v-icon
              ></a>
            </div>
          </div>
        </collapse-transition>
      </div>

      <div v-if="onBigScreen" class="pageBody" v-html="edition.text"></div>
      <div v-if="!!edition.brochure_url && onBigScreen" class="editionBrochure">
        <a
          class="editionBrochureLink"
          target="_blank"
          title="Ver el catálogo"
          :href="edition.brochure_url"
          >Ver catálogo
          <v-icon :color="MAIN_COLOR" name="external-link-alt"> </v-icon
        ></a>
      </div>
    </div>
    <div class="editionMedia">
      <Media
        height="200px"
        :gallery="edition.gallery"
        :youtubeUrl="edition.video_url"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./edition.ts"></script>
