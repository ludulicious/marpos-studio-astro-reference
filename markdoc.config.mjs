import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

// Authors use named tags; component imports and validation live here.
export default defineMarkdocConfig({
  tags: {
    callout: {
      render: component('./src/components/WorkflowNote.astro'),
      attributes: { title: { type: String, required: true } },
    },
  },
  nodes: {
    link: { ...nodes.link, render: component('./src/components/MarkdocLink.astro') },
    image: { ...nodes.image, render: component('./src/components/MarkdocImage.astro') },
  },
});
