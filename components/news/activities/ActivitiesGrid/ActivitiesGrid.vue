<template>
  <div v-if="noActivitiesToDisplay" class="activitiesGrid">
    <h1 v-if="!onPage" class="activitiesGridTitle">
      <nuxt-link :title="pageLinkTitle" :to="activitiesGridUrl">
        {{ title }}
      </nuxt-link>
    </h1>
    <div class="activitiesGridContainer">
      <div v-for="act in activities" v-bind:key="act.id" class="activity">
        {{/* not visible on small screens*/}}
        <ActivitySchedule
          v-if="onBigScreen"
          :calendarUrl="act.activity_calendar_url"
          :date="act.activity_date"
          :isDisabled="act.activity_date_has_passed"
        />
        <nuxt-link
          class="activitiesGridLink"
          :title="act.name"
          :to="getNewsPostUrlBySlug(act.slug)"
        >
          <ProgressiveImage
            v-if="act.gallery"
            :height="imageSize"
            :src="act.gallery[0].url"
          />
          <h3 v-html="act.name" class="activitiesGridTitle"></h3>
        </nuxt-link>
        <div class="activitiesMobileSchedule">
          <nuxt-link
            class="activitiesGridLink"
            :title="act.name"
            :to="getNewsPostUrlBySlug(act.slug)"
          >
            <h4 v-html="act.name" class="activitiesMobileScheduleTitle"></h4>
          </nuxt-link>
          <p class="activitiesMobileScheduleDate">
            {{ act.activity_date }}
          </p>
          <div class="activitiesMobileScheduleCalendarLinkContainer">
            <a
              target="_blank"
              class="activitiesMobileScheduleCalendarLink"
              title="Ver calendario"
              :href="act.activity_calendar_url"
              >Agéndalo</a
            >
          </div>
        </div>
      </div>
      <div v-if="!onPage" class="activitiesGridGoToPageButtonContainer">
        <nuxt-link
          class="activitiesGridGoToPageButton"
          :title="pageLinkTitle"
          :to="activitiesGridUrl"
        >
          Ver más
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./activitiesGrid.ts"></script>
<style lang="stylus" src="./activitiesGrid.styl"></style>
