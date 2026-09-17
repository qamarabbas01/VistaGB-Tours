import { htmlToParagraphs, parseNewsItems } from '@/lib/news/scraper';

const LISTING_BOX = `
<div class="blog-box row">
  <div class="col-md-4">
    <div class="post-media">
      <a href="https://visitgilgitbaltistan.gov.pk/public/pages/news/94">
        <img src="https://visitgilgitbaltistan.gov.pk/public/storage/images/story.jpg" alt="" />
      </a>
    </div>
  </div>
  <div class="blog-meta big-meta col-md-8">
    <h4>
      <a href="https://visitgilgitbaltistan.gov.pk/public/pages/news/94">Independence Day in GB</a>
    </h4>
    <p>
      On the special directives of the Chief Minister...
    </p>
    <small><a href="#">14 August, 2026</a></small>
    <small><a href="#">10:00:00 AM</a></small>
    <small><a href="#"><i class="fa fa-eye"></i> 321</a></small>
  </div>
</div>
<!-- end blog-box -->
`;

describe('news scraper', () => {
  it('parses listing cards with image, date, and official url', () => {
    const [item] = parseNewsItems(LISTING_BOX);
    expect(item).toMatchObject({
      id: '94',
      title: 'Independence Day in GB',
      date: '14 August, 2026',
      time: '10:00:00 AM',
      views: 321,
      image:
        'https://visitgilgitbaltistan.gov.pk/public/storage/images/story.jpg',
      url: 'https://visitgilgitbaltistan.gov.pk/public/pages/news/94',
    });
    expect(item.summary).toContain('Chief Minister');
  });

  it('keeps article paragraphs instead of collapsing the story to one line', () => {
    expect(
      htmlToParagraphs(
        'First paragraph.<br><br>Second paragraph.</p><p>Third paragraph.',
      ),
    ).toEqual(['First paragraph.', 'Second paragraph.', 'Third paragraph.']);
  });
});
