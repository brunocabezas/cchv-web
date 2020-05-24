import { ref, Ref, watch } from "@vue/composition-api"

export type Tabs = Tab[]
export type Tab = {
  title: string
  id: number
}

// recieves tabs with reference
export default function useTabs(tabs: Readonly<Ref<Readonly<Tabs>>>) {
  let activeTabId = ref((tabs.value[0] && tabs.value[0].id) || 0)

  // Every time tabs change, the activeTabId is set to the first tab
  watch(tabs, (tabs) => {
    // console.log(tabs)
    activeTabId.value = (tabs[0] && tabs[0].id) || 0
  })

  function setActiveTab(tabId: number) {
    activeTabId.value = tabId
  }

  return {
    activeTabId,
    tabs,
    setActiveTab,
  }
}
