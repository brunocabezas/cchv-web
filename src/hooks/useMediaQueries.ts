import { ref, Ref, watch, computed, reactive } from "@vue/composition-api"

// recieves tabs with reference
export default function useMediaQueries() {
  const firstTabId = computed(() => ()
  const activeTab = reactive({ id: firstTabId.value })

  // Every time tabs change, the activeTabId is set to the first tab
  watch(tabs, (tabs) => {
    const firstTabId = (tabs[0] && tabs[0].id) || undefined
    activeTab.id = firstTabId || 0
  })

  function setActiveTab(tabId: number) {
    activeTab.id = tabId
  }

  return {
    activeTabId: computed(() => activeTab.id),
    tabs,
    setActiveTab,
  }
}
