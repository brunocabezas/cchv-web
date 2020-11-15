<template>
  <div class="page transparencyPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">
        Transparencia
      </h1>
    </div>
    <Loader :loading="isLoading" />
    <div class="pageRow">
      <div class="pageLeft">
        <div class="pageBody" v-if="page" v-html="page.text"></div>
      </div>
      <div class="pageRight">
        <ul class="transparencyDocumentList" v-if="!isLoading">
          <li
            class="transparencyDocument"
            v-for="doc in documents"
            v-bind:key="doc.id"
          >
            <DownloadLink
              :title="`Descargar PDF: ${doc.name}`"
              :label="doc.name"
              :url="doc.documentUrl"
            />
          </li>
        </ul>
      </div>
    </div>
    <hr v-if="!isLoading" />
  </div>
</template>

<script lang="ts" src="./transparencia.ts"></script>
