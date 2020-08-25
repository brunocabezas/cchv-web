<template>
  <div class="activitySchedule">
    <p v-if="date" class="activityDate">
      <v-icon :color="MAIN_COLOR" name="calendar-alt" />
      {{ date }}
    </p>
    <div
      class="activityCalendar"
      v-bind:class="{
        'activityCalendar--disabled': isDisabled
      }"
    >
      <span
        v-if="isDisabled"
        disabled
        class="activityCalendarLink"
        title="Evento pasado"
        >Agéndalo
      </span>
      <a
        v-else
        target="_blank"
        class="activityCalendarLink"
        title="Ver calendario"
        :href="calendarUrl"
        >Agéndalo</a
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, PropType } from "@vue/composition-api";
import Icon from "vue-awesome/components/Icon.vue";
import { MAIN_COLOR } from "@/utils/static";

export default defineComponent({
  components: { "v-icon": Icon },
  name: "ActivitySchedule",
  props: {
    date: {
      type: String,
      default: ""
    },
    calendarUrl: {
      type: String,
      default: ""
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return { MAIN_COLOR };
  }
});
</script>

<style lang="stylus">
@import '../../styles/variables.styl';

.activitySchedule
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: $md)
    padding: 1em;

  .activityDate, .activityCalendar
    font-weight: bold;
    height: 40px;

  .activityDate
    border-top: 1px solid $blue;
    border-left: 1px solid $blue;
    border-bottom: 1px solid $blue;
    padding: 10px 5px 10px 10px;
    margin: 0;
    flex: 1;
    color: $blue;
    font-size: 14px;
    display: flex;
    align-items: center;

    .fa-icon
      margin-right: 10px;

  .activityCalendar
    display: flex;
    border-top: 1px solid $blue;
    border-right: 1px solid $blue;
    border-bottom: 1px solid $blue;
    transition: background-color 0.2s;

    &.activityCalendar--disabled
      border-color: $latest_posts_grey;
      opacity: 0.8;

      .activityCalendarLink
        background-color: $latest_posts_grey;

    .activityCalendarLink
      background-color: $blue;
      padding: 10px;
      color: white;
      font-style: italic;
      font-size: 14px;

    &:hover
      opacity: 0.8;
</style>