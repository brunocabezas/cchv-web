import { ref, Ref, watch, computed, reactive } from "@vue/composition-api"

export type Tabs = Tab[]
export type Tab = {
  title: string
  id: number
}

// recieves tabs with reference
export default function useTabs(tabs: Readonly<Ref<Readonly<Tabs>>>) {
  const firstTabId = computed(() => (tabs.value[0] && tabs.value[0].id) || 0)
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
