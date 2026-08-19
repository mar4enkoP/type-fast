import './styles/global.css';
import { TabsComponent } from './tabs/TabsComponent';
import { type TabItem } from './tabs/tabs.types';

const TAB_CONTENT: TabItem[] = [
  {
    id: '1',
    label: 'Block 1',
    text: 'Block 1',
  },
  {
    id: '2',
    label: 'Block 2',
    text: 'Block 2',
  },
];

document.addEventListener('DOMContentLoaded', (): void => {
  new TabsComponent('tabs', 'contentWrapper', TAB_CONTENT);
});
