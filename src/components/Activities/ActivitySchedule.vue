<template>
  <div class="activitySchedule">
    <p v-if="date" class="activityDate">
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
        :href="calendaUrl"
        >Agéndalo</a
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, PropType } from "@vue/composition-api";

export default defineComponent({
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
    return {};
  }
});
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl';

.activitySchedule
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .activityDate, .activityCalendar
    font-weight: bold;
    height: 40px;

  .activityDate
    border-top: 1px solid $blue;
    border-left: 1px solid $blue;
    border-bottom: 1px solid $blue;
    padding: 10px;
    margin: 0;
    flex: 1;
    color: $blue;

  .activityCalendar
    display: flex;
    border-top: 1px solid $blue;
    border-right: 1px solid $blue;
    border-bottom: 1px solid $blue;

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
</style>