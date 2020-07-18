<template>
  <div class="page activitiesGridPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">{{ title }}</h1>
    </div>
    <Loader :loading="isLoading" />
    <ActivitiesGrid onPage v-if="!isLoading" :type="activityType" />
  </div>
</template>
<script lang="ts" src="./activitiesGridPage.ts"></script>
