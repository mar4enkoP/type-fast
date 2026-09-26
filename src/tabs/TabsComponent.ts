import { type TabItem } from './tabs.types.ts';
import { splitLines } from '../lib/text-split/splitLines/splitLines.ts';
import { DURATION_MS, OVERLAP_MS, STAGGER_MS } from '../lib/animation/constants.ts';

export class TabsComponent {
  private readonly tabsEl: HTMLElement;
  private readonly wrapper: HTMLElement;
  private readonly items: TabItem[];
  private readonly splits: { lines: HTMLElement[]; destroy(): void }[] = [];
  private isAnimating = false;
  private queuedIndex: number | null = null;
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
    this.items.forEach((_item, index) => {
      const { lines, destroy } = splitLines(this.wrapper.children[index] as HTMLElement);
      this.splits.push({ lines, destroy });
      lines.forEach((line) => {
        if (index === 0) {
          line.style.transform = 'translateY(0)';
        } else {
          line.style.transform = 'translateY(150%)';
        }
      });
    });
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
    this.tabsEl.querySelectorAll('.tab').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    if (this.isAnimating) {
      this.queuedIndex = index;
      return;
    }
    if (index === this.activeIndex) {
      return;
    }
    this.isAnimating = true;
    this.animate(index);
  }

  private animate(nextIndex: number): void {
    const currentLines = this.getSplit(this.activeIndex).lines;
    const nextLines = this.getSplit(nextIndex).lines;
    currentLines.forEach((line, i) => {
      line.animate([{ transform: 'translateY(0%)' }, { transform: 'translateY(150%)' }], {
        duration: DURATION_MS,
        delay: i * STAGGER_MS,
        fill: 'forwards',
        easing: 'ease-in',
      });
    });
    const totalOutDuration = DURATION_MS + (currentLines.length - 1) * STAGGER_MS;
    let lastAnimation: Animation | undefined;
    nextLines.forEach((line, i) => {
      lastAnimation = line.animate(
        [{ transform: 'translateY(150%)' }, { transform: 'translateY(0%)' }],
        {
          duration: DURATION_MS,
          delay: totalOutDuration - OVERLAP_MS + i * STAGGER_MS,
          fill: 'forwards',
          easing: 'ease-out',
        }
      );
    });
    if (!lastAnimation) return;
    void lastAnimation.finished.then(() => {
      this.activeIndex = nextIndex;
      this.isAnimating = false;
      if (this.queuedIndex !== null) {
        const queuedIndex = this.queuedIndex;
        this.queuedIndex = null;
        this.animate(queuedIndex);
      }
    });
  }

  private getSplit(index: number): { lines: HTMLElement[]; destroy(): void } {
    const split = this.splits[index];
    if (!split) {
      throw new Error('Split not found');
    }
    return split;
  }
}
