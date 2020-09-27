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
      <h1
        class="editionName"
        v-bind:class="{ 'editionName--with-link': !!edition.url }"
        v-if="onBigScreen && !edition.url"
      >
        {{ edition.name }}
      </h1>

      <h1
        class="editionName"
        v-bind:class="{ 'editionName--with-link': !!edition.url }"
        v-if="onBigScreen && edition.url"
      >
        <a :href="edition.url" target="_blank">{{ edition.name }}</a>
      </h1>

      <p class="editionDate" v-if="edition.date && onBigScreen">
        {{ edition.date }}
      </p>
      <div v-if="!!edition.brochure_url && onBigScreen" class="editionBrochure">
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
      <div>
        <collapse-transition>
          <div v-show="isOpen">
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

      <div v-if="onBigScreen" class="pageBody" v-html="edition.text"></div>
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
