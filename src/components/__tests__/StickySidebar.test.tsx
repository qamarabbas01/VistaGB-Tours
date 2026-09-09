import { render } from '@testing-library/react';
import { StickySidebar } from '@/components/StickySidebar';

describe('StickySidebar', () => {
  it('stays in normal flow on small screens and sticks from the large breakpoint', () => {
    const { container } = render(
      <StickySidebar>
        <p>Reach us</p>
      </StickySidebar>,
    );

    const aside = container.querySelector('aside');
    const wrap = aside?.parentElement;
    expect(aside).not.toBeNull();
    expect(aside?.className).toMatch(/lg:sticky/);
    expect(aside?.className).toMatch(/lg:top-\[var\(--sticky-sidebar-top\)\]/);
    expect(aside?.className).not.toMatch(/\bfixed\b/);
    expect(aside?.className).not.toMatch(/(?:^|\s)sticky(?:\s|$)/);
    expect(wrap?.className).toMatch(/lg:h-0/);
    expect(wrap?.className).toMatch(/lg:min-h-full/);
  });

  it('can stick from the medium breakpoint used by destination layouts', () => {
    const { container } = render(
      <StickySidebar from="md" className="md:col-span-1">
        <p>Quick facts</p>
      </StickySidebar>,
    );

    const aside = container.querySelector('aside');
    const wrap = aside?.parentElement;
    expect(aside?.className).toMatch(/md:sticky/);
    expect(wrap?.className).toMatch(/md:col-span-1/);
    expect(aside?.className).not.toMatch(/lg:sticky/);
  });
});
