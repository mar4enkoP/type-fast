import './styles/global.css';
import { TabsComponent } from './tabs/TabsComponent';
import { type TabItem } from './tabs/tabs.types';

const TAB_CONTENT: TabItem[] = [
  {
    id: '1',
    label: 'Winston Churchill',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  },
  {
    id: '2',
    label: 'Oscar Wilde',
    text: 'Be yourself; everyone else is already taken. To live is the rarest thing in the world. Most people exist, that is all',
  },
];

document.addEventListener('DOMContentLoaded', (): void => {
  new TabsComponent('tabs', 'contentWrapper', TAB_CONTENT);
});
