<template>
  <div class="editions">
    <Loader :loading="isLoading" />
    <div class="editionsList">
      <div
        v-bind:key="event.id"
        v-for="event in editions"
        class="editionContainer"
      >
        <div class="editionContainerWrapper">
          <div class="edition">
            <div class="editionInfo">
              <h1
                class="editionName"
                v-if="!onBigScreen"
                @click="isOpen[event.id] = !isOpen[event.id]"
              >
                {{ event.name }}
                <v-icon name="chevron-down"> </v-icon>
              </h1>
              <h1 class="editionName" v-if="onBigScreen">
                {{ event.name }}
              </h1>
              <p class="editionDate" v-if="event.date && onBigScreen">
                {{ event.date }}
              </p>
              <div>
                <collapse-transition>
                  <div v-show="isOpen[event.id]">
                    <div class="pageBody" v-html="event.text"></div>
                    <div v-if="!!event.brochure_url" class="editionBrochure">
                      <a
                        class="editionBrochureLink"
                        target="_blank"
                        title="Ver el catálogo"
                        :href="event.brochure_url"
                        >Ver catálogo
                        <v-icon :color="MAIN_COLOR" name="external-link-alt">
                        </v-icon
                      ></a>
                    </div>
                  </div>
                </collapse-transition>
              </div>

              <div
                v-if="onBigScreen"
                class="pageBody"
                v-html="event.text"
              ></div>
              <div
                v-if="!!event.brochure_url && onBigScreen"
                class="editionBrochure"
              >
                <a
                  class="editionBrochureLink"
                  target="_blank"
                  title="Ver el catálogo"
                  :href="event.brochure_url"
                  >Ver catálogo
                  <v-icon :color="MAIN_COLOR" name="external-link-alt"> </v-icon
                ></a>
              </div>
            </div>
            <div class="editionMedia">
              <Media
                height="100%"
                :gallery="event.gallery"
                :youtubeUrl="event.video_url"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./editions.ts"></script>
<style scoped lang="stylus" src="./editions.styl"></style>
