import { routes } from '@/lib/routes';
import { posts } from '@/content/blog/posts';
import { stages } from '@/content/story';
import { capabilities, useCases } from '@/content/capabilities';
import { homeFaqs } from '@/content/faqs';
import { comparisonRows } from '@/components/sections/SeoGeoSection';
import { pricing } from '@/lib/pricing';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /llms-full.txt — a fuller machine-readable overview.
 *
 * Contains only public marketing content: no user data, no credentials, no
 * internal APIs. Everything here is generated from the same sources the site
 * renders, so it stays accurate automatically.
 */
export function GET() {
  const lines = [];
  const push = (...values) => lines.push(...values);

  push(`# ${site.name} — Full Overview`, '');
  push(`> ${site.description}`, '');
  push('## What GetGeoAgent is', '');
  push(
    `${site.name} is an AI agent for SEO (Search Engine Optimization) and GEO (Generative Engine Optimization). It maintains a model of a website's topic space, creates and structures content, prepares it for publishing, measures performance across search results and AI answer surfaces, and folds what it learns back into the plan.`,
    '',
  );
  push(`- Marketing website: ${site.url}`);
  push(`- Application: ${site.app.url}`);
  push(`- Sign up: ${site.app.signup}`);
  push(`- Log in: ${site.app.login}`, '');

  push('## Definitions', '');
  push(
    '- **SEO (Search Engine Optimization)**: optimizing content so it ranks in conventional search results.',
    '- **GEO (Generative Engine Optimization)**: optimizing content so AI-powered search and answer systems can understand, evaluate and cite it.',
    '- **AI SEO agent**: software that runs an end-to-end search workflow on a continuous cycle, keeping state between runs, rather than producing reports on demand.',
    '',
  );

  push('## The workflow', '');
  stages.forEach((stage) => {
    push(`### ${stage.number} — ${stage.heading} (${stage.label})`, '');
    push(stage.long, '');
    stage.points.forEach((point) => push(`- ${point}`));
    push('');
  });

  push('## Capabilities', '');
  capabilities.forEach((capability) => {
    push(`- **${capability.title}** (${capability.tag}): ${capability.body}`);
  });
  push('');

  push('## SEO compared with GEO', '');
  push('| Dimension | SEO | GEO |', '| --- | --- | --- |');
  comparisonRows.forEach((row) => push(`| ${row.dimension} | ${row.seo} | ${row.geo} |`));
  push('');

  push('## Use cases', '');
  useCases.forEach((useCase) => {
    push(`### ${useCase.title}`, '', useCase.body, '');
    useCase.points.forEach((point) => push(`- ${point}`));
    push('');
  });

  push('## Pricing', '');
  if (pricing.published && pricing.plans.length) {
    pricing.plans.forEach((plan) => {
      push(`- **${plan.name}**: ${plan.price} ${pricing.currency} per ${plan.interval}. ${plan.description}`);
    });
  } else {
    push(pricing.billingNote, '');
    push('Plans are scoped on:');
    pricing.factors.forEach((factor) => push(`- **${factor.title}**: ${factor.body}`));
  }
  push('');

  push('## Frequently asked questions', '');
  homeFaqs.forEach((faq) => {
    push(`### ${faq.question}`, '', faq.answer, '');
  });

  push('## Pages', '');
  routes.forEach((route) => push(`- [${route.title}](${absoluteUrl(route.path)}): ${route.summary}`));
  push('');

  push('## Articles', '');
  posts.forEach((post) => {
    push(
      `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}) — ${post.category}, published ${post.publishedAt}: ${post.excerpt}`,
    );
  });
  push('');

  push('## Claims policy', '');
  push(
    '- GetGeoAgent does not guarantee rankings, traffic, citations or inclusion in AI-generated answers.',
    '- Metrics shown in the product visualizations on the marketing site are illustrative, not customer results.',
    '- No customer testimonials, reviews, ratings or logos are published unless they are real and attributed.',
    '',
  );

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
