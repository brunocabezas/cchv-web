import { ref } from "@vue/composition-api"

export type Tabs = Tab[]
type Tab = {
  title: string
  id: number
}

export default function useTabs(tabs: Tabs) {
  let activeTabId = ref((tabs[0] && tabs[0].id) || 0)

  function setActiveTab(tabId: number) {
    activeTabId.value = tabId
  }

  return {
    activeTabId,
    tabs,
    setActiveTab,
  }
}
