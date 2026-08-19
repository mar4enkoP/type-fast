import { type TabItem } from './tabs.types';

export class TabsComponent {
  private readonly tabsEl: HTMLElement;
  private readonly wrapper: HTMLElement;
  private readonly items: TabItem[];
  private activeIndex = 0;

  constructor(tabsId: string, wrapperId: string, items: TabItem[]) {
    const tabsElement = document.getElementById(tabsId);
    const wrapperElement = document.getElementById(wrapperId);

    if (!tabsElement || !wrapperElement) {
      throw new Error('Required DOM elements not found');
    }

    this.tabsEl = tabsElement;
    this.wrapper = wrapperElement;
    this.items = items;

    this.render();
  }

  /**
   * Создаёт кнопки табов и панели с контентом.
   * Вызывается один раз при инициализации.
   */
  private render(): void {
    this.renderTabs();
    this.renderPanels();
  }

  /**
   * Рендерит кнопки табов
   */
  private renderTabs(): void {
    this.items.forEach((item, index) => {
      const button = document.createElement('button');
      button.className = index === 0 ? 'tab active' : 'tab';
      button.textContent = item.label;
      button.addEventListener('click', () => {
        this.setActive(index);
      });
      this.tabsEl.appendChild(button);
    });
  }

  /**
   * Рендерит панели с контентом
   */
  private renderPanels(): void {
    this.wrapper.innerHTML = '';
    this.items.forEach((item, index) => {
      const panel = document.createElement('div');
      panel.className = index === 0 ? 'role-content active' : 'role-content';
      panel.textContent = item.text;
      this.wrapper.appendChild(panel);
    });
  }

  /**
   * Переключает активный таб
   */
  private setActive(index: number): void {
    if (index === this.activeIndex) {
      return;
    }

    this.activeIndex = index;

    this.tabsEl.querySelectorAll('.tab').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    this.wrapper.querySelectorAll('.role-content').forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });
  }
}
